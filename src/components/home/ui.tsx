import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-kingdom-forest text-kingdom-cream shadow-card hover:bg-kingdom-forest-deep hover:shadow-passport",
  secondary:
    "border border-kingdom-gold/40 bg-transparent text-kingdom-ink hover:border-kingdom-gold/60 hover:bg-kingdom-parchment/50",
  ghost: "text-kingdom-ink-muted hover:text-kingdom-ink",
};

type RegistryButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

export function RegistryButton({
  href,
  children,
  variant = "primary",
  className = "",
}: RegistryButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-sm px-6 py-3.5 font-sans text-sm font-medium tracking-wide transition-all duration-300 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

type SectionEyebrowProps = {
  children: ReactNode;
};

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-kingdom-gold-dark">
      {children}
    </p>
  );
}

type SectionTitleProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionTitle({ children, as: Tag = "h2", className = "" }: SectionTitleProps) {
  return (
    <Tag
      className={`font-display text-3xl font-medium leading-tight tracking-tight text-kingdom-ink md:text-4xl lg:text-[2.75rem] ${className}`}
    >
      {children}
    </Tag>
  );
}

export function RegistryDivider({ className = "" }: { className?: string }) {
  return <div className={`registry-rule w-full max-w-xs ${className}`} aria-hidden />;
}
