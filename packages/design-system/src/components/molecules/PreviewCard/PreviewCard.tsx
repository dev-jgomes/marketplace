import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { Card } from "../Card/Card";
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
  textSize,
  textWeight,
  className,
  ...props
}: PreviewCardProps) => {
  const isOverlay = layout === "overlay";

  return (
    <Card className={cn(previewCardVariants({ layout, className }))} {...props}>
      <div
        className={cn(
          "relative w-full h-full overflow-hidden",
          !isOverlay && "aspect-square",
        )}
      >
        <img
          src={imageSrc}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all",
            isOverlay ? "rounded-none" : "rounded-lg",
          )}
        />
        {isOverlay && <div className="absolute inset-0 bg-black/40" />}
      </div>

      <div
        className={cn(
          isOverlay
            ? "absolute inset-0 flex items-end p-4"
            : "mt-2 transition-all",
          isOverlay ? "text-white" : "text-card-foreground",
        )}
      >
        <span
          className={cn(
            previewTitleVariants({ size: textSize, weight: textWeight }),
          )}
        >
          {title}
        </span>
      </div>
    </Card>
  );
};
