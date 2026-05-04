import { cva, type VariantProps } from "class-variance-authority";

export const footerVariants = cva(
  "w-full border-t transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "bg-background text-fg-main border-border",
        dark: "bg-brand-dark text-white border-white/10",
        minimal: "bg-transparent text-fg-muted border-none",
      },
      size: {
        /** Standard Marketplace spacing */
        default: "px-[var(--spacing-footer-px)] py-[var(--spacing-footer-py)]",
        /** Used for dashboard sub-footers */
        compact: "px-[var(--spacing-footer-px)] py-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const footerLinkVariants = cva(
  "text-sm transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "text-fg-muted hover:text-brand-main",
        dark: "text-white/60 hover:text-white",
        minimal: "text-fg-muted hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type FooterVariantProps = VariantProps<typeof footerVariants>;
