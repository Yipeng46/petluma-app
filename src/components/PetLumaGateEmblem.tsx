/* eslint-disable @next/next/no-img-element */

export const PETLUMA_GATE_EMBLEM_SRC = "/petluma-kingdom-gate-emblem.png";

export const PETLUMA_GATE_EMBLEM_COVER_CLASS =
  "cover-gate-emblem passport-cover-emblem__art";

type PetLumaGateEmblemProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  href: string;
};

/** Kingdom Gate emblem for SVG passport export (preview + PNG). */
export function PetLumaGateEmblem({
  x,
  y,
  width,
  height,
  href,
}: PetLumaGateEmblemProps) {
  if (!href) {
    return null;
  }

  return (
    <image
      id="petluma-gate-emblem"
      href={href}
      xlinkHref={href}
      x={x}
      y={y}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      opacity={0.92}
    />
  );
}

type PetLumaGateEmblemCoverProps = {
  className?: string;
};

/** Kingdom Gate emblem for HTML passport cover preview. */
export function PetLumaGateEmblemCover({
  className = PETLUMA_GATE_EMBLEM_COVER_CLASS,
}: PetLumaGateEmblemCoverProps) {
  return (
    <img
      src={PETLUMA_GATE_EMBLEM_SRC}
      alt=""
      width={220}
      height={330}
      className={className}
      crossOrigin="anonymous"
      draggable={false}
    />
  );
}
