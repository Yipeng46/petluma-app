export const PASSPORT_SVG_SELECTOR = "#petluma-passport-result";
export const PREVIEW_SELECTOR = ".passport-identity-page";

export type QaPageCheckResult = {
  overflow: boolean;
  textOverlap: boolean;
  invalidRender: boolean;
  missingImage: boolean;
  failures: string[];
};

export type QaCheckInput = {
  passportSelector: string;
  previewSelector: string;
  expectPhoto: boolean;
  isResultPage: boolean;
};

export function runDomChecks(input: QaCheckInput): QaPageCheckResult {
  const failures: string[] = [];
  const root = document.querySelector(
    input.isResultPage ? input.passportSelector : input.previewSelector,
  );

  if (!root) {
    return {
      overflow: true,
      textOverlap: true,
      invalidRender: true,
      missingImage: true,
      failures: [
        input.isResultPage
          ? "Passport SVG not found"
          : "Passport preview not found",
      ],
    };
  }

  const rootRect = root.getBoundingClientRect();

  if (rootRect.width <= 0 || rootRect.height <= 0) {
    failures.push("Passport render has zero dimensions");
  }

  const viewportWidth = window.innerWidth;
  const horizontalScroll = document.documentElement.scrollWidth - viewportWidth;
  const pageOverflow = horizontalScroll > 8;

  if (pageOverflow) {
    failures.push("Layout overflow beyond viewport width");
  }

  const textNodes = input.isResultPage
    ? root.querySelectorAll("text")
    : root.querySelectorAll(".passport-identity-value");
  const boxes: Array<{
    top: number;
    bottom: number;
    left: number;
    right: number;
    label: string;
  }> = [];

  textNodes.forEach((node, index) => {
    if (input.isResultPage) {
      const fontSize = Number.parseFloat(node.getAttribute("font-size") ?? "0");
      const content = node.textContent ?? "";

      if (fontSize < 12) {
        return;
      }

      if (content.includes("<<<<") || content.startsWith("P<PLM")) {
        return;
      }
    }

    const rect = node.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    boxes.push({
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      label: `text-${index}`,
    });
  });

  let textOverlap = false;
  for (let i = 0; i < boxes.length; i += 1) {
    for (let j = i + 1; j < boxes.length; j += 1) {
      const a = boxes[i];
      const b = boxes[j];
      const verticalOverlap = a.top < b.bottom - 1 && b.top < a.bottom - 1;
      const horizontalOverlap = a.left < b.right - 1 && b.left < a.right - 1;
      const overlapArea =
        Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)) *
        Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));

      if (verticalOverlap && horizontalOverlap && overlapArea > 24) {
        textOverlap = true;
        failures.push(`Text overlap between ${a.label} and ${b.label}`);
        break;
      }
    }
    if (textOverlap) {
      break;
    }
  }

  let missingImage = false;
  if (input.expectPhoto && input.isResultPage) {
    const svgImages = root.querySelectorAll("image");
    const photoImage = Array.from(svgImages).find((image) => {
      const href = image.getAttribute("href") ?? image.getAttribute("xlink:href");
      return Boolean(href && href.startsWith("data:image"));
    });

    if (!photoImage) {
      missingImage = true;
      failures.push("Expected pet photo image is missing");
    }
  }

  if (input.isResultPage) {
    const svg = root as SVGSVGElement;
    const viewBox = svg.viewBox?.baseVal;
    if (!viewBox || viewBox.width <= 0 || viewBox.height <= 0) {
      failures.push("Passport SVG viewBox is invalid");
    }
  }

  const xssExecuted = (window as Window & { __qaXssTriggered?: boolean }).__qaXssTriggered;
  if (xssExecuted) {
    failures.push("XSS payload executed in page context");
  }

  return {
    overflow: pageOverflow,
    textOverlap,
    invalidRender: failures.some(
      (message) =>
        message.includes("zero dimensions") ||
        message.includes("not found") ||
        message.includes("viewBox"),
    ),
    missingImage,
    failures,
  };
}

export async function testSvgExport(passportSelector: string): Promise<{
  exportFailed: boolean;
  failure?: string;
}> {
  const svg = document.querySelector(passportSelector) as SVGSVGElement | null;

  if (!svg) {
    return { exportFailed: true, failure: "Passport SVG missing for export" };
  }

  try {
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const viewBox = clone.viewBox.baseVal;
    const width = viewBox.width || svg.clientWidth;
    const height = viewBox.height || svg.clientHeight;

    const svgString = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);

    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Could not render passport SVG."));
        img.src = objectUrl;
      });

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width * 2);
      canvas.height = Math.round(height * 2);

      const context = canvas.getContext("2d");
      if (!context) {
        return { exportFailed: true, failure: "Could not create export canvas" };
      }

      context.fillStyle = "#f7f1e8";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/png", 1);
      if (!dataUrl.startsWith("data:image/png") || dataUrl.length < 100) {
        return { exportFailed: true, failure: "Export produced invalid PNG data" };
      }

      return { exportFailed: false };
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch (error) {
    return {
      exportFailed: true,
      failure: error instanceof Error ? error.message : "Export failed",
    };
  }
}

export function reportFailedCase(caseId: string, failures: string[]) {
  console.error("\nFAILED CASE");
  console.error(`  case: ${caseId}`);
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  console.error("");
}
