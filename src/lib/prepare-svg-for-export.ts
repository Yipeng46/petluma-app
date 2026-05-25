import { resolveImageDataUrl } from "@/lib/resolve-image-data-url";

const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = "http://www.w3.org/1999/xlink";

function readImageHref(image: SVGImageElement) {
  return (
    image.getAttribute("href") ||
    image.getAttributeNS(XLINK_NS, "href") ||
    image.getAttribute("xlink:href") ||
    ""
  );
}

function writeImageHref(image: SVGImageElement, dataUrl: string) {
  image.setAttribute("href", dataUrl);
  image.setAttributeNS(XLINK_NS, "xlink:href", dataUrl);
}

export async function prepareSvgForExport(
  svgElement: SVGSVGElement,
  options?: { photoSrc?: string | null },
) {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", SVG_NS);
  clone.setAttribute("xmlns:xlink", XLINK_NS);

  if (!clone.getAttribute("viewBox")) {
    const { width, height } = svgElement.getBoundingClientRect();
    clone.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  const images = Array.from(clone.querySelectorAll("image"));

  await Promise.all(
    images.map(async (image) => {
      const href = readImageHref(image);

      if (!href) {
        image.remove();
        return;
      }

      if (href.startsWith("data:")) {
        writeImageHref(image, href);
        return;
      }

      const dataUrl = await resolveImageDataUrl(href);

      if (dataUrl.startsWith("data:")) {
        writeImageHref(image, dataUrl);
        return;
      }

      image.remove();
    }),
  );

  if (options?.photoSrc) {
    const photoDataUrl = await resolveImageDataUrl(options.photoSrc);

    if (photoDataUrl.startsWith("data:")) {
      const portrait = clone.querySelector(
        "#passport-portrait-image",
      ) as SVGImageElement | null;

      if (portrait) {
        writeImageHref(portrait, photoDataUrl);
      }
    }
  }

  return clone;
}
