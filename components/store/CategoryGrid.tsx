import { PreviewCard } from "@marketplace/design-system";
import { cn } from "@marketplace/design-system/lib";

interface Category {
  id: string;
  title: string;
  imageUrl: string;
}

interface CategoryGridProps {
  categories: Category[];
  layout?: "stack" | "overlay";
  aspect?: "square" | "video" | "portrait" | "auto";
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

export const CategoryGrid = ({
  categories,
  layout,
  aspect = "square",
  cols = 4,
  className,
}: CategoryGridProps) => {
  return (
    <section
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-6",
        gridColsMap[cols], // Dynamic Desktop columns
        className,
      )}
    >
      {categories.map((product) => (
        <PreviewCard
          key={product.id}
          layout={layout}
          aspect={aspect}
          title={product.title}
          imageSrc={product.imageUrl}
          textWeight="bold"
        />
      ))}
    </section>
  );
};
