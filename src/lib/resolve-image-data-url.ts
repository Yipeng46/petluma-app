function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");

      if (result.startsWith("data:")) {
        resolve(result);
        return;
      }

      reject(new Error("Image reader did not produce a data URL."));
    };
    reader.onerror = () => reject(new Error("Could not read image blob."));
    reader.readAsDataURL(blob);
  });
}

function toAbsoluteSrc(src: string) {
  if (
    src.startsWith("blob:") ||
    src.startsWith("data:") ||
    src.startsWith("http://") ||
    src.startsWith("https://")
  ) {
    return src;
  }

  if (typeof window === "undefined") {
    return src;
  }

  return new URL(src, window.location.origin).href;
}

export async function resolveImageDataUrl(src: string): Promise<string> {
  if (!src) {
    return "";
  }

  if (src.startsWith("data:")) {
    return src;
  }

  try {
    const absoluteSrc = toAbsoluteSrc(src);
    const response = await fetch(absoluteSrc);

    if (!response.ok) {
      return "";
    }

    const blob = await response.blob();
    return await blobToDataUrl(blob);
  } catch {
    return "";
  }
}
