import type { Area } from "react-easy-crop";
import {
  PASSPORT_PHOTO_EXPORT_HEIGHT,
  PASSPORT_PHOTO_EXPORT_WIDTH,
} from "@/lib/passport-photo-frame";

const CLOUD_PHOTO_URL_MAX = 120_000;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => reject(new Error("Could not load image.")));
    image.src = src;
  });
}

function compressCanvasToDataUrl(canvas: HTMLCanvasElement): string {
  for (let quality = 0.92; quality >= 0.5; quality -= 0.06) {
    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    if (dataUrl.length <= CLOUD_PHOTO_URL_MAX) {
      return dataUrl;
    }
  }

  const fallback = canvas.toDataURL("image/jpeg", 0.5);
  return fallback;
}

export async function cropPassportPhoto(
  imageSrc: string,
  pixelCrop: Area,
): Promise<string> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = PASSPORT_PHOTO_EXPORT_WIDTH;
  canvas.height = PASSPORT_PHOTO_EXPORT_HEIGHT;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not create crop canvas.");
  }

  context.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    PASSPORT_PHOTO_EXPORT_WIDTH,
    PASSPORT_PHOTO_EXPORT_HEIGHT,
  );

  return compressCanvasToDataUrl(canvas);
}
