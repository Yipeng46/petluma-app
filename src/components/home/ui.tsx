import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-kingdom-ink bg-kingdom-ink text-kingdom-cream hover:bg-kingdom-brown",
  secondary:
    "border border-kingdom-ink/20 bg-kingdom-cream text-kingdom-ink hover:border-kingdom-ink/35 hover:bg-kingdom-ivory",
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
      className={`inline-flex items-center justify-center px-5 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-500 ${variantClasses[variant]} ${className}`}
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
