import fs from 'fs';
import path from 'path';

const html = fs.readFileSync("./scripts/raw-tema.html", "utf-8");

// Regular expression to match each card item block in the catalog
const cardBlockRegex = /<figure class="card border h-100 m-0">([\s\S]*?)<\/figure>/g;

let match;
let count = 0;
const designsDir = "./src/content/designs";

// Helper to sanitize title to slug
function sanitizeSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Categorization helper
function determineCategoryAndEventType(title, slug) {
  const t = title.toLowerCase();
  const s = slug.toLowerCase();

  // Kids & Birthday
  if (t.includes("shark") || t.includes("mickey") || t.includes("pikachu") || t.includes("sanrio") || 
      t.includes("turtles") || t.includes("xabiru") || t.includes("child") || t.includes("kids") || 
      t.includes("birthday") || t.includes("party") || t.includes("fruity")) {
    return {
      category: "kids-birthday",
      eventType: "birthday",
      tags: ["kids", "birthday", "cute", "party"]
    };
  }

  // Aqiqah & Tasmiyah
  if (t.includes("aqiqah") || t.includes("tasmiyah") || t.includes("baby") || t.includes("aqsa")) {
    return {
      category: "aqiqah-dan-tasmiyah",
      eventType: "aqiqah",
      tags: ["aqiqah", "islami", "bayi"]
    };
  }

  // Khitan
  if (t.includes("khitan") || t.includes("sunat") || t.includes("kuda macan")) {
    return {
      category: "undangan-khitan-digital",
      eventType: "khitanan",
      tags: ["khitanan", "anak", "syukuran"]
    };
  }

  // Umum, Gathering & Corporate
  if (t.includes("gathering") || t.includes("meeting") || t.includes("retreat") || t.includes("seminar") || 
      t.includes("lotte") || t.includes("bima") || t.includes("honda") || t.includes("bpjs") || 
      t.includes("garuda") || t.includes("stikes") || t.includes("buku") || t.includes("awards") || 
      t.includes("annual") || t.includes("institute")) {
    return {
      category: "umum",
      eventType: "corporate",
      tags: ["corporate", "event", "seminar", "umum"]
    };
  }

  // Wedding (Default / Fallback)
  // Let's determine regional tags
  const tags = ["wedding", "modern"];
  if (t.includes("jawa") || t.includes("java")) tags.push("adat-jawa");
  if (t.includes("batak")) tags.push("adat-batak");
  if (t.includes("sunda")) tags.push("adat-sunda");
  if (t.includes("minang") || t.includes("padang")) tags.push("adat-minang");
  if (t.includes("aceh")) tags.push("adat-aceh");
  if (t.includes("melayu")) tags.push("adat-melayu");
  if (t.includes("mandarin") || t.includes("chinese")) tags.push("oriental");
  if (t.includes("watercolor")) tags.push("watercolor");
  if (t.includes("minimalist") || t.includes("cream")) tags.push("minimalis");
  if (t.includes("vintage")) tags.push("vintage");
  if (t.includes("passport")) tags.push("unik");

  return {
    category: "wedding",
    eventType: "wedding",
    tags: tags
  };
}

console.log("Starting theme extraction...");

while ((match = cardBlockRegex.exec(html)) !== null) {
  const blockContent = match[1];

  // 1. Extract Image URL
  const imgMatch = blockContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  const imageUrl = imgMatch ? imgMatch[1] : null;

  // 2. Extract Title
  const titleMatch = blockContent.match(/<h2 class="h6">([^<]+)<\/h2>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  // 3. Extract Preview Link
  const previewMatch = blockContent.match(/href=["'](https:\/\/inv\.acaranya\.id\/preview\/[^"']+)["']/i);
  const previewUrl = previewMatch ? previewMatch[1] : null;

  if (title && imageUrl && previewUrl) {
    const slug = sanitizeSlug(title);
    const { category, eventType, tags } = determineCategoryAndEventType(title, slug);

    // Determine Premium vs Free status
    // Default: Make high-quality wedding / regional / corporate themes premium
    const isPremium = !title.toLowerCase().includes("free") && !title.toLowerCase().includes("gratis") && !slug.includes("buka-bersama");

    const content = `---
title: "${title}"
category: "${category}"
eventType: "${eventType}"
thumbnail: "${imageUrl}"
previewUrl: "${previewUrl}"
isFeatured: ${count < 4}
isPremium: ${isPremium}
tags: ${JSON.stringify(tags)}
sortOrder: ${count}
status: "published"
---
`;

    const filepath = path.join(designsDir, `${slug}.md`);
    
    // Write theme markdown
    fs.writeFileSync(filepath, content);
    console.log(`[Imported] ${title} -> ${filepath} (Category: ${category})`);
    count++;
  }
}

console.log(`\nImport complete! Total of ${count} templates successfully imported into the Katalog Desain content collection!`);
