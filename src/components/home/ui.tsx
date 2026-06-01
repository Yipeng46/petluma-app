import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[#1F1B17] bg-[#1F1B17] text-[#FFFFFF] hover:border-[#2D2722] hover:bg-[#2D2722] hover:text-[#FFFFFF]",
  secondary:
    "border border-[#1F1B17]/14 bg-[#FFFFFF] text-[#1F1B17] hover:border-[#1F1B17]/26 hover:bg-[#FAF8F5]",
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
      className={`registry-btn registry-btn--${variant} pl-btn inline-flex items-center justify-center px-6 py-3 transition-colors duration-500 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

type SectionEyebrowProps = {
  children: ReactNode;
};

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return <p className="pl-caption mb-4">{children}</p>;
}

type SectionTitleProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionTitle({ children, as: Tag = "h2", className = "" }: SectionTitleProps) {
  return (
    <Tag className={`pl-section-title ${className}`}>
      {children}
    </Tag>
  );
}

export function RegistryDivider({ className = "" }: { className?: string }) {
  return <div className={`registry-rule w-full max-w-xs ${className}`} aria-hidden />;
}
