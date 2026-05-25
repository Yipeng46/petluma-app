declare module "dom-to-image-more" {
  type DomToImageOptions = {
    quality?: number;
    bgcolor?: string;
    cacheBust?: boolean;
    width?: number;
    height?: number;
    style?: Record<string, string>;
  };

  const domtoimage: {
    toPng: (node: HTMLElement, options?: DomToImageOptions) => Promise<string>;
  };

  export default domtoimage;
}
