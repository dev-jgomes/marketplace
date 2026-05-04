// packages/design-system/src/organisms/marketplace/Navbar/Navbar.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "../navbar";
import { ShoppingCart, Bell, User } from "lucide-react";
import { Button } from "../../atoms/ui/button";

const meta: Meta<typeof Navbar> = {
  title: "Organisms/Navbar",
  component: Navbar,
  // ENFORCE: Generate full technical documentation automatically
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  /**
   * DEFAULTS: Pre-populating the controls so they are "test-ready" upon load.
   * This aligns with the "Migration Study" goal of rapid component verification.
   */
  args: {
    placeholder: "Search the marketplace...",
    navLinks: [
      { label: "Hardware", href: "/category/hardware" },
      { label: "Software", href: "/category/software" },
      { label: "Services", href: "/category/services" },
      { label: "Infrastructure", href: "/category/infra" },
    ],
    // Default mock for search testing
    searchResults: [
      { id: "1", label: "Cloud Storage v4", value: "storage" },
      { id: "2", label: "Edge Computing Node", value: "edge" },
    ],
  },
  argTypes: {
    logo: { table: { disable: true } },
    actionSlot: { table: { disable: true } },
    LinkComponent: { table: { disable: true } },
    className: { table: { disable: true } },
    // Enhance testing for the text-based controls
    placeholder: { control: "text" },
    emptyResultMessage: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-125 bg-muted/10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

/**
 * STORY: The Standard Consumer View
 * This story inherits all defaults from 'meta.args'.
 */
export const Default: Story = {
  args: {
    onSignIn: () => console.log("Sign In triggered from Storybook"),
  },
};

/**
 * STORY: Authenticated (Developer Reference)
 * Shows how the actionSlot should be implemented in the app.
 */
export const Authenticated: Story = {
  args: {
    actionSlot: (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground"
        >
          <ShoppingCart className="size-5" />
          <span className="absolute top-1.5 right-1.5 size-2 bg-primary rounded-full" />
        </Button>
        <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center border ml-2">
          <User className="size-5 text-accent-foreground" />
        </div>
      </div>
    ),
  },
};

/**
 * STORY: No Results State
 * Easy way for designers to check the "Empty State" styling.
 */
export const NoResults: Story = {
  args: {
    searchResults: [],
    emptyResultMessage: "No marketplace items match your search.",
  },
};
