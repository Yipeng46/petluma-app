import sharp from "sharp";
import path from "node:path";
import { rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const emblemPath = path.join(__dirname, "../public/petluma-kingdom-gate-emblem.png");

const GOLD = { r: 212, g: 175, b: 55 }; // #D4AF37

const { data, info } = await sharp(emblemPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  if (luminance > 245) {
    data[i + 3] = 0;
    continue;
  }

  const alpha = Math.max(0, Math.min(255, Math.round((255 - luminance) * 1.35)));
  data[i] = GOLD.r;
  data[i + 1] = GOLD.g;
  data[i + 2] = GOLD.b;
  data[i + 3] = alpha < 18 ? 0 : alpha;
}

await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
})
  .png()
  .toFile(`${emblemPath}.tmp`);

const tmpPath = `${emblemPath}.tmp`;
await rename(tmpPath, emblemPath);

console.log(`Processed transparent emblem: ${emblemPath}`);
