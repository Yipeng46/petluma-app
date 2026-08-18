import Image from "next/image";

type HomeProductImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  variant?: "hero" | "product" | "archive";
};

const variantClassName = {
  hero: "home-product-image home-product-image--hero",
  product: "home-product-image home-product-image--product",
  archive: "home-product-image home-product-image--archive",
} as const;

export function HomeProductImage({
  src,
  alt,
  priority = false,
  variant = "product",
}: HomeProductImageProps) {
  if (variant === "hero") {
    return (
      <figure className={`${variantClassName.hero} hero-product`}>
        <Image
          src={src}
          alt={alt}
          width={819}
          height={1024}
          priority={priority}
          sizes="(max-width: 1023px) 76vw, 420px"
          unoptimized
          className="hero-passport-image home-product-image__asset home-product-image__asset--hero"
        />
      </figure>
    );
  }

  return (
    <figure className={variantClassName[variant]}>
      <div className="home-product-image__frame">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1023px) 92vw, 46vw"
          className="home-product-image__asset"
        />
      </div>
    </figure>
  );
}
