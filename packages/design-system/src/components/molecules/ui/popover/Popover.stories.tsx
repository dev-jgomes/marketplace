import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "../popover";
import { Button } from "../../../atoms/ui/button";

const meta: Meta<typeof Popover> = {
  title: "Molecules/UI/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <div className="flex justify-center p-20">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the default dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
          <div className="grid gap-4 py-4">
            <p className="text-xs italic">Content goes here...</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
