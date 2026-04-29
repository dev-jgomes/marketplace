import { cva } from "class-variance-authority";

export const productPriceVariants = cva("font-bold tracking-tight", {
  variants: {
    variant: {
      default: "text-foreground",
      discount: "text-brand-main",
      original: "text-muted-foreground line-through text-xs",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export const productBadgeVariants = cva(
  "rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase backdrop-blur-sm",
  {
    variants: {
      intent: {
        new: "bg-blue-500/90 text-white",
        sale: "bg-red-500/90 text-white",
        organic: "bg-green-500/90 text-white",
        default: "bg-white/90 text-black",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);
