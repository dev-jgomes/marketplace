import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { Zap } from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "New Arrival",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "In Stock",
  },
};

export const Sale: Story = {
  args: {
    variant: "destructive",
    children: "30% OFF",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => {
    return (
      <Badge {...args}>
        <Zap />
        <span>Flash Sale</span>
      </Badge>
    );
  },
};
