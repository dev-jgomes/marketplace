"use client";
import { ProductCard, Button } from "@marketplace/design-system";
import { cn } from "@marketplace/design-system/lib";
import { Heart } from "lucide-react";

interface ProductTag {
  label: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: string;
  /** Optional discounted price. If present, the UI shows strikethrough logic. */
  priceWithDiscount?: string;
  /** Rating on a scale of 0 to 10. (Component converts this to 0-5 stars) */
  rating?: number;
  /** Total number of reviews. Hides if rating is undefined. */
  reviewCount?: number;
  imageSrc: string;
  /** Array of labels with their specific visual variants. */
  tags?: ProductTag[];
}

interface ProductGridProps {
  products: Product[];
  /** Control the number of columns on desktop */
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

/** * Tailwind JIT Safelist Mapping
 * This ensures the classes are bundled in the final CSS.
 */
const gridColsMap = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

export const ProductGrid = ({
  products,
  cols = 4,
  className,
}: ProductGridProps) => {
  return (
    <section
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-6",
        gridColsMap[cols], // Dynamic Desktop columns
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          // Inject the interactive button at the grid level
          action={
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-xl inset-shadow-sm bg-white/80 backdrop-blur-md hover:bg-white hover:text-red-500"
              onClick={(e) => {
                e.preventDefault();
                console.log(`Added ${product.id} to favorites`);
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          }
        />
      ))}
    </section>
  );
};
