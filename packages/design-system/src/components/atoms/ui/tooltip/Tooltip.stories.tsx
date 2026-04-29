import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import { Button } from "../button";

const meta: Meta<typeof Tooltip> = {
  title: "Atoms/UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  // We define the structure in a render function at the meta level
  // or per story to show how the compound components work together.
  argTypes: {
    delayDuration: {
      control: "number",
      description:
        "The duration from when the mouse enters the trigger until the tooltip opens.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * Default Tooltip - Following the Badge pattern
 */
export const Default: Story = {
  args: {
    delayDuration: 200,
  },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover Me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Tooltip Content</span>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Variant: Positioned Bottom
 */
export const Bottom: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="secondary">Bottom Placement</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <span>The tooltip is below the trigger</span>
      </TooltipContent>
    </Tooltip>
  ),
};
