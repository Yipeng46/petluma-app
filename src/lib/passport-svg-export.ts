const SVG_NS = "http://www.w3.org/2000/svg";

function normalizeSvgMarkup(svgElement: SVGSVGElement) {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", SVG_NS);

  if (!clone.getAttribute("viewBox")) {
    const { width, height } = svgElement.getBoundingClientRect();
    clone.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  return clone;
}

export async function exportPassportSvgToPng(
  svgElement: SVGSVGElement,
  filename: string,
  scale = 2,
) {
  const clone = normalizeSvgMarkup(svgElement);
  const viewBox = clone.viewBox.baseVal;
  const width = viewBox.width || svgElement.clientWidth;
  const height = viewBox.height || svgElement.clientHeight;

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
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not create export canvas.");
    }

    context.fillStyle = "#f7f1e8";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png", 1);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
