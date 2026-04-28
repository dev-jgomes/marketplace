import type { Meta, StoryObj } from "@storybook/react";
import { PreviewCard } from "./PreviewCard";

const meta: Meta<typeof PreviewCard> = {
  title: "Molecules/PreviewCard",
  component: PreviewCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    layout: {
      control: "inline-radio",
      options: ["stack", "overlay"],
      description:
        "Defines the content arrangement (Stacked below or Overlayed on image)",
    },
    aspect: {
      control: "select",
      options: ["square", "video", "portrait", "auto"],
      description:
        "Controls the image aspect ratio using CSS Variables (Tailwind v4 tokens)",
    },
    textSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Font size for the card title",
    },
    textWeight: {
      control: "select",
      options: ["normal", "bold"],
      description: "Font weight for the card title",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PreviewCard>;

const SAMPLE_IMG =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800";

/**
 * **Primary Stacked Layout**
 * This is the standard product card. It features a clean background hover effect
 * and transition-ready typography.
 */
export const Primary: Story = {
  args: {
    title: "Minimalist Watch Collection",
    imageSrc: SAMPLE_IMG,
    layout: "stack",
    aspect: "square",
    textSize: "md",
    textWeight: "normal",
  },
  render: (args) => (
    <div className="w-75">
      <PreviewCard {...args} />
    </div>
  ),
};

/**
 * **Overlay Variant**
 * Perfect for hero sections or category banners. The text is positioned
 * over a semi-transparent dark overlay for readability.
 */
export const FullWidthOverlay: Story = {
  args: {
    title: "Explore Tech Essentials",
    imageSrc:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=800",
    layout: "overlay",
    aspect: "square",
    textSize: "lg",
    textWeight: "bold",
  },
  render: (args) => (
    <div className="w-100">
      <PreviewCard {...args} />
    </div>
  ),
};

/**
 * **Aspect Ratio Comparison**
 * This story demonstrates how the same component adapts to different
 * design system tokens: Square (1:1), Video (16:9), and Portrait (3:4).
 */
export const RatioGallery: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <p className="text-[10px] font-mono text-gray-400 uppercase">
            Aspect: Square
          </p>
          <PreviewCard {...args} aspect="square" title="Square Product" />
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-mono text-gray-400 uppercase">
            Aspect: Video
          </p>
          <PreviewCard {...args} aspect="video" title="Video Banner" />
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-mono text-gray-400 uppercase">
            Aspect: Portrait
          </p>
          <PreviewCard {...args} aspect="portrait" title="Fashion Shot" />
        </div>
      </div>
    </div>
  ),
};

/**
 * **Stress Test: Long Titles**
 * Validates how the typography handles long strings using 'truncate' or 'line-clamp'.
 */
export const TextStressTest: Story = {
  args: {
    ...Primary.args,
    title:
      "This is a very long product title that should be handled gracefully by the component's variant logic",
    textSize: "sm",
  },
  render: (args) => (
    <div className="w-62.5">
      <PreviewCard {...args} />
    </div>
  ),
};
