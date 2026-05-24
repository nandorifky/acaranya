import fs from 'fs';

const html = fs.readFileSync("./scripts/raw-tema.html", "utf-8");
const index = html.indexOf("Baby Shark New");
if (index !== -1) {
  console.log("HTML around 'Baby Shark New':");
  console.log(html.substring(index - 300, index + 800));
} else {
  console.log("Not found!");
}
