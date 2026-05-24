import fs from 'fs';

async function run() {
  try {
    console.log("Fetching theme catalog HTML...");
    const res = await fetch("https://inv.acaranya.id/tema");
    const html = await res.text();
    
    // Save to scratch directory
    fs.writeFileSync("./scripts/raw-tema.html", html);
    console.log("Saved raw HTML to ./scripts/raw-tema.html successfully!");
    
    // Let's parse all cards.
    // Usually cards have structures like an image tag or a link. Let's do a quick regex search for card-like structures,
    // or look at how images are linked (e.g. .webp or .png or .jpg).
    const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    const images = [];
    while ((match = regex.exec(html)) !== null) {
      images.push(match[1]);
    }
    console.log(`Found ${images.length} total img tags in HTML!`);
    console.log("First 10 images:", images.slice(0, 10));
    
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
