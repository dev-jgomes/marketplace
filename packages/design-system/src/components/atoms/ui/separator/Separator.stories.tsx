import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../separator";

const meta: Meta<typeof Separator> = {
  title: "Atoms/UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator.",
    },
    decorative: {
      control: "boolean",
      description: "If true, the element is ignored by assistive technologies.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

/**
 * Standard horizontal separator used in footers and list items.
 */
export const Horizontal: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-full max-w-md p-4 bg-background">
      <div>
        <h4 className="text-sm font-medium leading-none">Marketplace UI</h4>
        <p className="text-sm text-fg-muted">Design System Primitives</p>
      </div>
      <Separator {...args} />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <div>Docs</div>
        <div>Source</div>
      </div>
    </div>
  ),
  args: {
    orientation: "horizontal",
    decorative: true,
  },
};

/**
 * Vertical orientation used for inline navigation or toolbars.
 */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
    // Remove fixed height (h-0.5); let Radix handle it or use w-px
    className: "bg-border w-px h-full",
    decorative: true,
  },
  render: (args) => (
    /* We set a fixed height on the parent so h-full has a reference */
    <div className="flex h-10 items-center gap-4 bg-background rounded-md">
      <span className="text-sm font-semibold">Home</span>
      <Separator {...args} />
      <span className="text-sm font-semibold">Profile</span>
      <Separator {...args} />
      <span className="text-sm font-semibold">Settings</span>
    </div>
  ),
};

/**
 * Custom Styling: Demonstrates Tailwind v4 semantic token mapping.
 */
export const Branded: Story = {
  args: {
    className: "bg-brand-main h-0.5",
    orientation: "horizontal",
  },
};
