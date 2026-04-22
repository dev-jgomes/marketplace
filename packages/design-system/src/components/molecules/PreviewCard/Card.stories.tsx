import type { Meta, StoryObj } from "@storybook/react";
import { PreviewCard } from "./PreviewCard";

const meta: Meta<typeof PreviewCard> = {
  title: "Molecules/PreviewCard",
  component: PreviewCard,
  tags: ["autodocs"],
  argTypes: {
    layout: { control: "select", options: ["stack", "overlay"] },
    textSize: { control: "select", options: ["sm", "md", "lg"] },
    textWeight: { control: "select", options: ["normal", "bold"] },
  },
};

export default meta;
type Story = StoryObj<typeof PreviewCard>;

const SAMPLE_IMG =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400";

/** * Primary: Stacked layout.
 * Note the hover effect: background appears, padding is added, image rounds further.
 */
export const Primary: Story = {
  args: {
    title: "Electronics Category",
    imageSrc: SAMPLE_IMG,
    layout: "stack",
    textSize: "md",
    textWeight: "normal",
  },
  render: (args) => (
    <div className="max-w-70.5">
      <PreviewCard {...args} />
    </div>
  ),
};

/** * Full Width: Overlay layout.
 * Image takes full height/width with text positioned on an overlay.
 */
export const FullWidthOverlay: Story = {
  args: {
    title: "Summer Collection",
    imageSrc:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400",
    layout: "overlay",
    textSize: "lg",
    textWeight: "bold",
  },
  render: (args) => (
    <div className="max-w-100">
      <PreviewCard {...args} />
    </div>
  ),
};

/** * Bold Callout: Optimized for sub-category grids.
 */
export const SubCategoryBold: Story = {
  args: {
    title: "New Arrivals",
    imageSrc:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
    layout: "stack",
    textSize: "sm",
    textWeight: "bold",
  },
  render: (args) => (
    <div className="max-w-50">
      <PreviewCard {...args} />
    </div>
  ),
};
