import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../dialog";
import { Button } from "../../../atoms/ui/button";

const meta: Meta<typeof Dialog> = {
  title: "Molecules/UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Migration Update</DialogTitle>
          <DialogDescription>
            This dialog is now framework-agnostic and follows the Marketplace
            Project Developer protocols.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm">
          Content injected into the library must be UI-focused only. Avoid data
          fetching here.
        </div>
        <DialogFooter showCloseButton>
          <Button variant="secondary">Confirm Action</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutCloseIcon: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Destructive Action</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          {/* In this variant, the user must interact with footer buttons */}
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
