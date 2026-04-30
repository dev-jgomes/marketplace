import { CustomButton } from "@marketplace/design-system";
import { Button } from "@/components/ui/button";
import { Button as AgnosticButton } from "@marketplace/design-system";

export default function LabPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center gap-24 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-start gap-6 bg-gray-100 rounded-lg p-6">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            This is a Button from a Agnostic Library using Storybook.
          </h1>

          <CustomButton primary label="Click me!" />
        </div>

        <div className="flex flex-col items-start gap-6 bg-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-semibold leading-9 tracking-tight text-black dark:text-zinc-50">
            This is a Button from Shadcn.
          </h2>

          <Button
            aria-label="Submit"
            variant="default"
            size="default"
            className="bg-brand-main"
          >
            Submit
          </Button>
        </div>

        <div className="flex flex-col items-start gap-6 bg-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-semibold leading-9 tracking-tight text-black dark:text-zinc-50">
            This is a Shadcn Button from a Agnostic Library using Storybook.
          </h2>

          <AgnosticButton aria-label="Submit" variant="default" size="default">
            Submit
          </AgnosticButton>
        </div>
      </main>
    </div>
  );
}
