export async function resolveImageDataUrl(src: string): Promise<string> {
  if (!src) {
    return "";
  }

  if (src.startsWith("data:")) {
    return src;
  }

  try {
    const response = await fetch(src);

    if (!response.ok) {
      return src;
    }

    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return src;
  }
}
