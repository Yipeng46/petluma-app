import sharp from "sharp";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const candidates = [
  join(root, "public", "petluma-logo-source.png"),
  "C:/Users/zyp68/.cursor/projects/c-Users-zyp68-petluma-app/assets/c__Users_zyp68_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_67ba18cbb91e2fef013d2b76f8e416b-71216fab-9a4d-45ef-baed-e6c97bb01877.png",
];

const src = candidates.find((candidate) => existsSync(candidate));
if (!src) {
  throw new Error("petluma logo source image not found");
}

const meta = await sharp(src).metadata();
const width = meta.width ?? 1024;
const height = meta.height ?? 388;
const cropHeight = Math.min(height, Math.round(height * 0.52));

const wordmark = await sharp(src)
  .extract({ left: 0, top: 0, width, height: cropHeight })
  .png()
  .toBuffer();

const targetW = 780;
const resizedMeta = await sharp(wordmark).metadata();
const targetH = Math.max(
  130,
  Math.round(((resizedMeta.height ?? cropHeight) / (resizedMeta.width ?? width)) * targetW),
);
const canvasH = targetH + 44;

const resized = await sharp(wordmark)
  .resize({ width: targetW, height: targetH, fit: "inside" })
  .png()
  .toBuffer();

const labelSvg = `
<svg width="${targetW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
  <text x="252" y="${targetH + 30}" fill="#7A6A5E" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="0.34em">KINGDOM REGISTRY</text>
</svg>`;

const label = await sharp(Buffer.from(labelSvg)).png().toBuffer();

await sharp({
  create: {
    width: targetW,
    height: canvasH,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    { input: resized, top: 0, left: 0 },
    { input: label, top: 0, left: 0 },
  ])
  .png()
  .toFile(join(root, "public", "petluma-header-logo.png"));

console.log(`header logo ${targetW}x${canvasH} from ${width}x${height}`);
