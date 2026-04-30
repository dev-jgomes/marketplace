"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "../../molecules/ui/card/Card";
import { cn } from "../../../lib/utils";
import { Star } from "lucide-react";
import { Badge } from "../../atoms/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../atoms/ui/tooltip";

export interface ProductTag {
  label: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export interface ProductCardProps {
  title: string;
  description?: string;
  price: string;
  priceWithDiscount?: string;
  rating?: number; // 0-5
  reviewCount?: number;
  imageSrc: string;
  tags?: ProductTag[];
  action?: React.ReactNode;
  className?: string;
}

export function ProductCard({
  title,
  description,
  price,
  priceWithDiscount,
  rating,
  reviewCount,
  imageSrc,
  tags,
  action,
  className,
}: ProductCardProps) {
  return (
    <Card
      className={cn(
        "pt-0 group/product-card transition-all hover:shadow-lg",
        className,
      )}
    >
      {/* 1. Top Image with Tags and Action Slot */}
      <div className="relative aspect-4/5 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover/product-card:scale-105"
        />

        {/* Favorite Action Overlay */}
        {action && (
          <CardAction className="absolute right-2 top-2 z-10 translate-y-1 opacity-0 transition-all duration-300 group-hover/product-card:translate-y-0 group-hover/product-card:opacity-100">
            {action}
          </CardAction>
        )}

        {/* Dynamic Tags */}
        {tags && tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge
                key={tag.label}
                variant={tag.variant || "secondary"}
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase backdrop-blur-sm",
                )}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* 2. Header with Title and Rating */}
      <CardHeader className="gap-0 border-none pb-0 pt-0">
        <div className="flex items-center justify-between truncate">
          <TooltipProvider>
            <Tooltip delayDuration={700}>
              <TooltipTrigger asChild>
                <CardTitle className="text-sm font-bold truncate">
                  {title}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {rating !== undefined && (
            <div className="flex items-center gap-0.5 text-[11px]">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{rating}</span>
              {reviewCount !== undefined && (
                <span className="text-muted-foreground">({reviewCount})</span>
              )}
            </div>
          )}
        </div>
        {description && (
          <CardDescription className="line-clamp-2 text-xs leading-tight">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      {/* 3. Content with Pricing Logic */}
      <CardContent className="mt-auto">
        <div className="flex items-baseline gap-2">
          {priceWithDiscount ? (
            <>
              <span className="text-base font-bold text-brand-main">
                {priceWithDiscount}
              </span>
              <span className="text-xs text-muted-foreground line-through">
                {price}
              </span>
            </>
          ) : (
            <span className="text-base font-bold">{price}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
