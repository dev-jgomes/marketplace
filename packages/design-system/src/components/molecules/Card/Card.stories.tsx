import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "./Card";
import { ShadcnButton } from "@/components/atoms/ShadcnButton";

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Adjusts the internal padding and gap of the card",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * The standard Marketplace Card using the compound component pattern.
 */
export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-87.5">
      <CardHeader>
        <CardTitle>Marketplace Item</CardTitle>
        <CardDescription>Published 2 days ago in Electronics</CardDescription>
        <CardAction>
          <ShadcnButton variant="ghost" size="sm">
            Submit
          </ShadcnButton>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full rounded-md bg-muted mb-4 flex items-center justify-center">
          <span className="text-muted-foreground">
            Product Image Placeholder
          </span>
        </div>
        <p>
          This is a high-quality marketplace item description using our semantic
          tokens.
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <span className="font-bold text-lg">$299.00</span>
          <ShadcnButton variant="ghost" size="sm">
            Submit
          </ShadcnButton>
        </div>
      </CardFooter>
    </Card>
  ),
};

/**
 * A compact version of the card, ideal for dense grid layouts.
 */
export const Compact: Story = {
  args: {
    size: "sm",
  },
  render: (args) => (
    <Card {...args} className="max-w-70">
      <CardHeader className="border-b">
        <CardTitle>Compact View</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-xs">
          Used for sidebar widgets or dense marketplace listings.
        </p>
      </CardContent>
      <CardFooter>
        <ShadcnButton variant="ghost" size="sm">
          Submit
        </ShadcnButton>
      </CardFooter>
    </Card>
  ),
};
