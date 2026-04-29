import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Card, CardTitle } from "../Card/Card";
import {
  previewCardVariants,
  previewTitleVariants,
} from "./PreviewCard.variants";

export interface PreviewCardProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof previewCardVariants> {
  title: string;
  imageSrc: string;
  textSize?: VariantProps<typeof previewTitleVariants>["size"];
  textWeight?: VariantProps<typeof previewTitleVariants>["weight"];
}

export const PreviewCard = ({
  title,
  imageSrc,
  layout = "stack",
  aspect,
  textSize,
  textWeight,
  className,
  ...props
}: PreviewCardProps) => {
  const isOverlay = layout === "overlay";

  return (
    <Card
      className={cn(previewCardVariants({ layout, aspect, className }))}
      {...props}
    >
      <div
        className={cn(
          "relative w-full h-full overflow-hidden transition-all",
          !isOverlay ? "rounded-lg" : "h-full w-full absolute inset-0",
        )}
      >
        <img
          src={imageSrc}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
            isOverlay ? "rounded-none" : "rounded-lg",
          )}
        />
        {isOverlay && (
          <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-60" />
        )}
      </div>
      <div
        className={cn(
          "relative z-10", // Garante que o texto fique acima do overlay
          isOverlay ? "mt-auto p-4 text-white" : "transition-all",
        )}
      >
        <CardTitle
          className={cn(
            previewTitleVariants({ size: textSize, weight: textWeight }),
          )}
        >
          {title}
        </CardTitle>
      </div>
    </Card>
  );
};
