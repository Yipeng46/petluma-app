import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[#2e2820] bg-[#2e2820] text-kingdom-cream hover:border-[#3d342b] hover:bg-[#3d342b]",
  secondary:
    "border border-[#2e2820]/14 bg-transparent text-kingdom-ink hover:border-[#2e2820]/26 hover:bg-[#f7f3eb]/80",
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
      className={`inline-flex items-center justify-center px-6 py-3 font-sans text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${variantClasses[variant]} ${className}`}
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
    <p className="mb-4 font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-kingdom-gold-dark">
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
      className={`font-display font-medium leading-[1.08] tracking-tight text-kingdom-ink ${className}`}
    >
      {children}
    </Tag>
  );
}

export function RegistryDivider({ className = "" }: { className?: string }) {
  return <div className={`registry-rule w-full max-w-xs ${className}`} aria-hidden />;
}
