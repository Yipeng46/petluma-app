import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(__dirname, "../public/images/petluma-passport-hero-source.jpg");
const outputPath = path.join(__dirname, "../public/images/petluma-passport-hero.png");

const BLACK_THRESHOLD = 36;

const { data, info } = await sharp(sourcePath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let index = 0; index < data.length; index += 4) {
  const red = data[index];
  const green = data[index + 1];
  const blue = data[index + 2];

  if (red <= BLACK_THRESHOLD && green <= BLACK_THRESHOLD && blue <= BLACK_THRESHOLD) {
    data[index + 3] = 0;
    continue;
  }

  if (red <= BLACK_THRESHOLD + 12 && green <= BLACK_THRESHOLD + 12 && blue <= BLACK_THRESHOLD + 12) {
    const luminance = (red + green + blue) / 3;
    const alpha = Math.round(((luminance - BLACK_THRESHOLD) / 12) * 255);
    data[index + 3] = Math.min(data[index + 3], Math.max(0, Math.min(255, alpha)));
  }
}

await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
})
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(outputPath);

const meta = await sharp(outputPath).metadata();
console.log("wrote", outputPath, meta.width, meta.height, meta.format, meta.channels);
