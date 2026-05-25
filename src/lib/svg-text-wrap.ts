function estimateMaxCharsPerLine(maxWidth: number, fontSize: number) {
  return Math.max(8, Math.floor(maxWidth / (fontSize * 0.52)));
}

function fallbackWrapText(text: string, maxWidth: number, fontSize: number) {
  const words = text.trim().split(/\s+/);
  const maxChars = estimateMaxCharsPerLine(maxWidth, fontSize);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.length ? lines : [text];
}

export function wrapSvgText(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  fontWeight: string | number = 600,
) {
  const normalized = text.trim();

  if (!normalized) {
    return [""];
  }

  if (typeof document === "undefined") {
    return fallbackWrapText(normalized, maxWidth, fontSize);
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return fallbackWrapText(normalized, maxWidth, fontSize);
  }

  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

  const words = normalized.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    const width = context.measureText(candidate).width;

    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else if (width > maxWidth) {
      lines.push(word);
      currentLine = "";
    } else {
      currentLine = candidate;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length ? lines : [normalized];
}
