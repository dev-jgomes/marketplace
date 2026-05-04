import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "../footer";

const meta: Meta<typeof Footer> = {
  title: "Organisms/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "dark", "minimal"],
    },
    size: {
      control: "select",
      options: ["default", "compact"],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Footer>;

const MOCK_DATA = {
  logo: <div className="text-xl font-black tracking-tighter">MARKETPLACE.</div>,
  copyText: `© ${new Date().getFullYear()} Marketplace Project. Built for scale.`,
  sections: [
    {
      title: "Marketplace",
      links: [
        { label: "All Categories", href: "#" },
        { label: "Featured Stores", href: "#" },
        { label: "Sell on Marketplace", href: "#" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "My Profile", href: "#" },
        { label: "Order History", href: "#" },
        { label: "Settings", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Community", href: "#" },
        { label: "Contact Us", href: "#" },
      ],
    },
  ],
};

export const Default: Story = {
  args: {
    ...MOCK_DATA,
    variant: "default",
  },
};

export const Dark: Story = {
  args: {
    ...MOCK_DATA,
    variant: "dark",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Minimal: Story = {
  args: {
    ...MOCK_DATA,
    variant: "minimal",
    sections: [],
  },
};

export const Mobile: Story = {
  args: {
    ...MOCK_DATA,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
