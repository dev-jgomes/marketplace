import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/**
 * Standard marketplace textarea used for feedback or
 * simple multi-line text entries.
 */
export const Default: Story = {
  args: {
    placeholder: "Tell us about your experience...",
  },
};

/**
 * Demonstrates the 'field-sizing-content' utility behavior
 * where the area grows as the user types.
 */
export const AutoResizing: Story = {
  args: {
    placeholder: "This area grows with your content...",
    defaultValue: "Line 1\nLine 2\nLine 3\nLine 4",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "You cannot edit this area.",
    defaultValue: "System generated log: Order #12345 processed.",
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "Too short...",
    placeholder: "Error state example",
  },
};
