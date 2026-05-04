import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel"],
    },
    disabled: {
      control: "boolean",
    },
  },
  // Ensure the component stays within a reasonable container in Storybook
  decorators: [
    (Story) => (
      <div className="max-w-sm p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Search marketplace...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Not clickable",
    value: "System offline",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Kitchen Appliances",
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "invalid@email",
  },
};
