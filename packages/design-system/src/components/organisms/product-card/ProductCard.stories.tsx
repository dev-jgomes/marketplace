import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./index";
import { Heart } from "lucide-react";
import { Button } from "../../atoms/ui/button";

const meta: Meta<typeof ProductCard> = {
  title: "Organisms/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    action: {
      control: "boolean",
      description: "Toggle the favorite/action button overlay",
    },
    rating: { control: { type: "range", min: 0, max: 5, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

const PRODUCT_IMG =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800";

export const Default: Story = {
  args: {
    title: "Eco-Friendly Wristwatch",
    description:
      "A sustainable timepiece made from recycled ocean plastic and organic materials.",
    price: "$120.00",
    rating: 8.5,
    reviewCount: 124,
    imageSrc: PRODUCT_IMG,
    tags: [
      { label: "Sale", variant: "default" },
      { label: "Limited", variant: "secondary" },
    ],
    action: true,
  },
  render: (args) => {
    const actionElement = args.action ? (
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full shadow-lg hover:text-red-500"
        onClick={(e) => e.preventDefault()}
      >
        <Heart className="h-4 w-4" />
      </Button>
    ) : undefined;

    return (
      <div className="w-72">
        <ProductCard {...args} action={actionElement} />
      </div>
    );
  },
};

export const OnSale: Story = {
  args: {
    ...Default.args,
    title: "Premium Leather Picnic Set",
    price: "$250.00",
    priceWithDiscount: "$185.00",
    tags: [
      { label: "Sale", variant: "destructive" },
      { label: "Best Seller", variant: "secondary" },
    ],
    rating: undefined,
    reviewCount: undefined,
    imageSrc:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=800",
    action: undefined,
  },
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} />
    </div>
  ),
};
