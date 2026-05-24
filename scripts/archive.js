import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const [, , collection, rawIndex] = process.argv;

if (!["goals", "now"].includes(collection) || !rawIndex) {
  console.error("Usage: node scripts/archive.js <goals|now> <1-based-index>");
  process.exit(1);
}

const filePath = resolve(__dirname, `../src/data/${collection}.json`);
const items = JSON.parse(readFileSync(filePath, "utf8"));

const idx = parseInt(rawIndex, 10) - 1;
if (isNaN(idx) || idx < 0 || idx >= items.length) {
  console.error(`Index out of range. File has ${items.length} item(s).`);
  process.exit(1);
}

const item = items[idx];
if (item.archivedAt) {
  console.log(`Already archived on ${item.archivedAt}. No change.`);
  process.exit(0);
}

item.archivedAt = new Date().toISOString().slice(0, 10);
writeFileSync(filePath, JSON.stringify(items, null, 2) + "\n", "utf8");
console.log(`Archived: "${item.text}" → ${item.archivedAt}`);
