import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [source, id] = process.argv.slice(2);
if (!source || !id || !/^[A-Z]{2,5}-\d{2}$/.test(id)) {
  throw new Error("Usage: node scripts/optimize-image.mjs <source.png> <REFORM-ID>");
}
await fs.access(source);
const destination = path.resolve("public/images/reforms", `${id.toLowerCase()}.webp`);
await fs.mkdir(path.dirname(destination), { recursive: true });
await sharp(source).resize(640, 640, { fit: "cover" }).webp({ quality: 84, effort: 5 }).toFile(destination);
console.log(`${id}: ${destination}`);
