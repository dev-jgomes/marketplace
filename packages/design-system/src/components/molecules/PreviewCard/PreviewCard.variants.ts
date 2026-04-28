import { cva } from "class-variance-authority";

export const previewCardVariants = cva(
  "group relative overflow-hidden transition-all duration-300 rounded-xl border-none ring-0 gap-2",
  {
    variants: {
      layout: {
        stack: "bg-transparent p-4 hover:bg-card hover:shadow-xl",
        overlay: "aspect-square w-full p-0 hover:shadow-xl",
      },
      aspect: {
        square: "aspect-[var(--ratio-square)]",
        video: "aspect-[var(--ratio-video)]",
        portrait: "aspect-[var(--ratio-portrait)]",
        auto: "aspect-auto",
      },
    },
    defaultVariants: {
      layout: "stack",
    },
  },
);

export const previewTitleVariants = cva("transition-all block p-2", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    weight: {
      normal: "font-normal",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
  },
});
