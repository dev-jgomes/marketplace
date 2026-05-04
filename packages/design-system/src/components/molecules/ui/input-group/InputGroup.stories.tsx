import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupText,
} from "./InputGroup";

const meta: Meta<typeof InputGroup> = {
  title: "Molecules/UI/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-md p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

/**
 * This variant represents the specific Searchbar
 * trigger you described for the Navbar first row.
 */
export const MarketplaceSearchbar: Story = {
  render: () => (
    <InputGroup className="w-full">
      <InputGroupAddon align="inline-start">
        <Search className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search for items, brands, and more..." />
      <InputGroupAddon align="inline-end">
        <InputGroupText>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithActionButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter discount code" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="secondary" size="xs">
          Apply
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};
