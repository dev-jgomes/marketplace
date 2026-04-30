import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Atoms/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
  },
  args: {
    onClick: fn(),
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Primary Action",
    size: "default",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Action",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete Item",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    children: "🚀", // In a real scenario, use a Lucide icon here
    "aria-label": "Launch",
  },
};
