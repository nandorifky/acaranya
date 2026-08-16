/**
 * Cloudflare Pages Functions Middleware
 * Implements Markdown for Agents (content negotiation)
 *
 * When a request includes `Accept: text/markdown`:
 *  - Fetches the original HTML from the static asset
 *  - Strips non-content elements (scripts, styles, nav, footer, etc.)
 *  - Extracts metadata from <head> (title, description, og:image)
 *  - Converts body HTML to Markdown
 *  - Preserves JSON-LD as fenced code block
 *  - Returns with Content-Type: text/markdown and token estimate
 *
 * Browsers get normal HTML (default behavior).
 */

interface Env {}

// Elements to completely remove (including their content)
const STRIP_ELEMENTS = new Set([
  'script', 'style', 'noscript', 'svg', 'iframe', 'nav', 'header', 'footer',
  'form', 'button', 'input', 'select', 'textarea', 'canvas', 'video', 'audio',
  'dialog', 'template', 'slot',
]);

// Elements to remove only the tag (keep children content)
const UNWRAP_ELEMENTS = new Set([
  'div', 'span', 'section', 'article', 'aside', 'main', 'figure',
  'figcaption', 'details', 'summary',
]);

/**
 * Check if the request wants markdown
 */
function wantsMarkdown(request: Request): boolean {
  const accept = request.headers.get('Accept') || '';
  return accept.includes('text/markdown');
}

/**
 * Check if response is HTML
 */
function isHtmlResponse(response: Response): boolean {
  const ct = response.headers.get('Content-Type') || '';
  return ct.includes('text/html');
}

/**
 * Extract metadata and JSON-LD from HTML using HTMLRewriter,
 * and strip non-content elements from the body.
 */
async function processHtml(html: string): Promise<{
  title: string;
  description: string;
  image: string;
  jsonLd: string[];
  cleanedHtml: string;
}> {
  const meta = {
    title: '',
    description: '',
    image: '',
  };
  const jsonLd: string[] = [];
  let insideStrippedElement = 0;
  let insideJsonLd = false;
  let currentJsonLd = '';
  let insideHead = false;
  let insideTitle = false;
  let titleText = '';

  // We'll collect the body content after stripping
  const chunks: string[] = [];

  // Use HTMLRewriter to process
  const rewriter = new HTMLRewriter()
    // Track <head> to extract title text
    .on('head', {
      element() { insideHead = true; },
    })
    .on('title', {
      element() { insideTitle = true; },
      text(text) {
        if (insideTitle) titleText += text.text;
        if (text.lastInTextNode) insideTitle = false;
      },
    })
    // Extract meta tags
    .on('meta', {
      element(el) {
        const name = (el.getAttribute('name') || '').toLowerCase();
        const property = (el.getAttribute('property') || '').toLowerCase();
        const content = el.getAttribute('content') || '';
        if (!content) return;

        if (name === 'title' || (!meta.title && property === 'og:title')) {
          meta.title = content;
        }
        if (name === 'description' || (!meta.description && property === 'og:description')) {
          meta.description = content;
        }
        if (property === 'og:image' && !meta.image) {
          meta.image = content;
        }
      },
    })
    // Extract JSON-LD scripts
    .on('script[type="application/ld+json"]', {
      element() { insideJsonLd = true; currentJsonLd = ''; },
      text(text) {
        if (insideJsonLd) currentJsonLd += text.text;
        if (text.lastInTextNode) {
          insideJsonLd = false;
          if (currentJsonLd.trim()) {
            jsonLd.push(currentJsonLd.trim());
          }
        }
      },
    });

  // Process through HTMLRewriter
  const response = new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
  const processed = rewriter.transform(response);
  // We need the full text to do regex-based stripping and conversion
  await processed.text();

  // Use the title from <title> tag as fallback
  if (!meta.title && titleText) {
    meta.title = titleText.trim();
  }

  // Now do regex-based stripping of the HTML
  let cleanedHtml = html;

  // Remove everything in <head>
  cleanedHtml = cleanedHtml.replace(/<head[\s\S]*?<\/head>/gi, '');

  // Remove stripped elements and their content
  for (const tag of STRIP_ELEMENTS) {
    // Handle self-closing and content-bearing variants
    const regex = new RegExp(
      `<${tag}(\\s[^>]*)?\\/?>([\\s\\S]*?<\\/${tag}>)?`,
      'gi'
    );
    cleanedHtml = cleanedHtml.replace(regex, '');
  }

  // Remove HTML comments
  cleanedHtml = cleanedHtml.replace(/<!--[\s\S]*?-->/g, '');

  // Remove doctype and html/body tags (keep content)
  cleanedHtml = cleanedHtml.replace(/<!DOCTYPE[^>]*>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<\/?html[^>]*>/gi, '');
  cleanedHtml = cleanedHtml.replace(/<\/?body[^>]*>/gi, '');

  return {
    title: meta.title,
    description: meta.description,
    image: meta.image,
    jsonLd,
    cleanedHtml: cleanedHtml.trim(),
  };
}

/**
 * Decode HTML entities
 */
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

/**
 * Convert cleaned HTML to Markdown using regex-based approach
 */
function htmlToMarkdown(html: string): string {
  let md = html;

  // Normalize line endings
  md = md.replace(/\r\n?/g, '\n');

  // --- Block elements ---

  // Headings: <h1>...<h6>
  for (let i = 1; i <= 6; i++) {
    const prefix = '#'.repeat(i);
    const regex = new RegExp(`<h${i}[^>]*>([\\s\\S]*?)<\\/h${i}>`, 'gi');
    md = md.replace(regex, (_, content) => {
      const text = stripInlineTags(content).trim();
      return `\n\n${prefix} ${text}\n\n`;
    });
  }

  // Preformatted code blocks: <pre><code>...</code></pre>
  md = md.replace(/<pre[^>]*>\s*<code[^>]*(?:\sclass="[^"]*language-(\w+)[^"]*")?[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_, lang, content) => {
      const decoded = decodeEntities(content).trim();
      return `\n\n\`\`\`${lang || ''}\n${decoded}\n\`\`\`\n\n`;
    }
  );

  // Pre blocks without code
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, content) => {
    const decoded = decodeEntities(stripInlineTags(content)).trim();
    return `\n\n\`\`\`\n${decoded}\n\`\`\`\n\n`;
  });

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) => {
    const text = stripInlineTags(content).trim();
    const lines = text.split('\n').map(l => `> ${l.trim()}`).join('\n');
    return `\n\n${lines}\n\n`;
  });

  // Tables
  md = convertTables(md);

  // Ordered lists
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, content) => {
    let index = 0;
    const items = content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (__, item) => {
      index++;
      const text = stripInlineTags(item).trim();
      return `${index}. ${text}`;
    });
    return `\n\n${items.trim()}\n\n`;
  });

  // Unordered lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, content) => {
    const items = content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (__, item) => {
      const text = stripInlineTags(item).trim();
      return `- ${text}`;
    });
    return `\n\n${items.trim()}\n\n`;
  });

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, content) => {
    const text = stripInlineTags(content).trim();
    if (!text) return '';
    return `\n\n${text}\n\n`;
  });

  // Horizontal rules
  md = md.replace(/<hr[^>]*\/?>/gi, '\n\n---\n\n');

  // Line breaks
  md = md.replace(/<br[^>]*\/?>/gi, '\n');

  // --- Inline elements ---

  // Images (before links to handle images inside links)
  md = md.replace(/<img[^>]*\ssrc="([^"]*)"[^>]*\salt="([^"]*)"[^>]*\/?>/gi,
    (_, src, alt) => `![${decodeEntities(alt)}](${src})`);
  md = md.replace(/<img[^>]*\salt="([^"]*)"[^>]*\ssrc="([^"]*)"[^>]*\/?>/gi,
    (_, alt, src) => `![${decodeEntities(alt)}](${src})`);
  // img without alt
  md = md.replace(/<img[^>]*\ssrc="([^"]*)"[^>]*\/?>/gi, (_, src) => `![](${src})`);

  // Links
  md = md.replace(/<a[^>]*\shref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, href, text) => {
      const linkText = stripInlineTags(text).trim();
      if (!linkText) return '';
      return `[${linkText}](${href})`;
    });

  // Bold/strong
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, content) => `**${content.trim()}**`);

  // Italic/em
  md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, content) => `*${content.trim()}*`);

  // Inline code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, content) => {
    const text = decodeEntities(content).trim();
    return `\`${text}\``;
  });

  // Strikethrough
  md = md.replace(/<(del|s|strike)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, content) => `~~${content.trim()}~~`);

  // Mark/highlight → just keep text
  md = md.replace(/<mark[^>]*>([\s\S]*?)<\/mark>/gi, '$1');

  // Definition lists
  md = md.replace(/<dt[^>]*>([\s\S]*?)<\/dt>/gi, (_, content) => `\n\n**${stripInlineTags(content).trim()}**\n`);
  md = md.replace(/<dd[^>]*>([\s\S]*?)<\/dd>/gi, (_, content) => `: ${stripInlineTags(content).trim()}\n`);
  md = md.replace(/<\/?dl[^>]*>/gi, '\n');

  // Remove all remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode remaining entities
  md = decodeEntities(md);

  // Clean up whitespace
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.trim();

  return md;
}

/**
 * Strip inline HTML tags, keeping text content
 */
function stripInlineTags(html: string): string {
  // First handle links - convert to text
  let result = html.replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1');
  // Handle images - keep alt text
  result = result.replace(/<img[^>]*\salt="([^"]*)"[^>]*\/?>/gi, '$1');
  // Bold
  result = result.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '$2');
  // Italic
  result = result.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '$2');
  // Code
  result = result.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '$1');
  // Remove any remaining tags
  result = result.replace(/<[^>]+>/g, '');
  return decodeEntities(result);
}

/**
 * Convert HTML tables to Markdown tables
 */
function convertTables(html: string): string {
  return html.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, tableContent) => {
    const rows: string[][] = [];
    let isHeader = false;
    let headerRowCount = 0;

    // Extract rows from thead and tbody
    const headMatch = tableContent.match(/<thead[^>]*>([\s\S]*?)<\/thead>/i);
    const bodyMatch = tableContent.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);

    const processRows = (content: string, isHead: boolean) => {
      const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
      let rowMatch;
      while ((rowMatch = rowRegex.exec(content)) !== null) {
        const cells: string[] = [];
        const cellRegex = /<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi;
        let cellMatch;
        while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
          cells.push(stripInlineTags(cellMatch[1]).trim());
        }
        if (cells.length > 0) {
          rows.push(cells);
          if (isHead) headerRowCount++;
        }
      }
    };

    if (headMatch) processRows(headMatch[1], true);
    if (bodyMatch) {
      processRows(bodyMatch[1], false);
    } else if (!headMatch) {
      // No thead/tbody, process all rows, treat first as header
      processRows(tableContent, false);
      if (rows.length > 0) headerRowCount = 1;
    }

    if (rows.length === 0) return '';

    // Determine column count
    const colCount = Math.max(...rows.map(r => r.length));

    // Normalize rows to same column count
    const normalized = rows.map(r => {
      while (r.length < colCount) r.push('');
      return r;
    });

    // Build markdown table
    const lines: string[] = [];
    const headerRows = headerRowCount || 1;

    for (let i = 0; i < normalized.length; i++) {
      lines.push('| ' + normalized[i].join(' | ') + ' |');
      if (i === headerRows - 1) {
        lines.push('| ' + normalized[i].map(() => '---').join(' | ') + ' |');
      }
    }

    return '\n\n' + lines.join('\n') + '\n\n';
  });
}

/**
 * Estimate token count (rough approximation: ~4 chars per token)
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Build the final Markdown document
 */
function buildMarkdownDocument(
  title: string,
  description: string,
  image: string,
  bodyMarkdown: string,
  jsonLd: string[],
): string {
  const parts: string[] = [];

  // YAML frontmatter
  const frontmatterFields: string[] = [];
  if (title) frontmatterFields.push(`title: ${title}`);
  if (description) frontmatterFields.push(`description: ${description}`);
  if (image) frontmatterFields.push(`image: ${image}`);

  if (frontmatterFields.length > 0) {
    parts.push('---');
    parts.push(frontmatterFields.join('\n'));
    parts.push('---');
    parts.push('');
  }

  // Body
  parts.push(bodyMarkdown);

  // JSON-LD
  if (jsonLd.length > 0) {
    parts.push('');
    parts.push('```json');
    parts.push(jsonLd.join('\n'));
    parts.push('```');
  }

  return parts.join('\n');
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;

  // Only process GET requests that want markdown
  if (request.method !== 'GET' || !wantsMarkdown(request)) {
    // Pass through — add Vary: Accept so caches know about negotiation
    const response = await context.next();
    const newResponse = new Response(response.body, response);
    newResponse.headers.append('Vary', 'Accept');
    return newResponse;
  }

  // Fetch the original response
  const response = await context.next();

  // Only convert HTML responses with 200 status
  if (response.status !== 200 || !isHtmlResponse(response)) {
    const newResponse = new Response(response.body, response);
    newResponse.headers.append('Vary', 'Accept');
    return newResponse;
  }

  try {
    const html = await response.text();

    // Extract metadata, JSON-LD, and clean the HTML
    const { title, description, image, jsonLd, cleanedHtml } = await processHtml(html);

    // Convert cleaned HTML to Markdown
    const bodyMarkdown = htmlToMarkdown(cleanedHtml);

    // Build the final document
    const markdown = buildMarkdownDocument(title, description, image, bodyMarkdown, jsonLd);

    // Calculate token counts
    const markdownTokens = estimateTokens(markdown);
    const originalTokens = estimateTokens(html);

    // Build response headers — preserve origin headers, adjust as needed
    const headers = new Headers(response.headers);

    // Set markdown content type
    headers.set('Content-Type', 'text/markdown; charset=utf-8');

    // Add/merge Vary header
    headers.set('Vary', 'Accept');

    // Remove headers that no longer match the converted body
    headers.delete('Content-Encoding');
    headers.delete('Content-Range');
    headers.delete('Transfer-Encoding');
    headers.delete('ETag');
    headers.delete('Last-Modified');

    // Set correct content length
    const encoded = new TextEncoder().encode(markdown);
    headers.set('Content-Length', String(encoded.byteLength));

    // Add token count headers
    headers.set('x-markdown-tokens', String(markdownTokens));
    headers.set('x-original-tokens', String(originalTokens));

    // Add content signal if origin doesn't have one
    if (!headers.has('content-signal')) {
      headers.set('content-signal', 'ai-train=yes, search=yes, ai-input=yes');
    }

    return new Response(markdown, {
      status: 200,
      headers,
    });
  } catch (err) {
    // If conversion fails, return original HTML with Vary header
    // Re-fetch since we already consumed the body
    const fallback = await context.next();
    const fallbackResponse = new Response(fallback.body, fallback);
    fallbackResponse.headers.append('Vary', 'Accept');
    return fallbackResponse;
  }
};
