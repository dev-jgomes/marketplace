# Component Creation Guide — Storybook & File Structure

**Quick Answer:** Every component follows a standardized file structure: a `ComponentName.tsx` file paired with `ComponentName.stories.tsx`, an `index.ts` barrel export, and optionally a `ComponentName.variants.ts` file for components with multiple variations.

---

## When This Matters

Every time you:

- Create a new component for the design system
- Add variants to an existing component
- Set up Storybook documentation
- Plan a component structure for consistency

---

## Component File Structure

### **Required Files**

```
atoms/
├── ui/
│   └── button/                      # Folder: kebab-case
│   ├── Button.tsx                   # Component: PascalCase
│   ├── Button.stories.tsx           # Stories: PascalCase.stories.tsx
│   ├── index.ts                     # Barrel export
│   └── Button.variants.ts           # (Optional) Multiple variants only
```

### **File Purposes**

| File                        | Purpose                                           | Required    |
| --------------------------- | ------------------------------------------------- | ----------- |
| `ComponentName.tsx`         | Component implementation                          | ✅ Yes      |
| `ComponentName.stories.tsx` | Storybook documentation & playground              | ✅ Yes      |
| `index.ts`                  | Barrel export for the component                   | ✅ Yes      |
| `ComponentName.variants.ts` | CVA variants (if component has multiple variants) | ⚠️ Optional |

---

## Step-by-Step Component Creation

### **Step 1: Determine Component Level**

Use the classification matrix in [atomic_design_protocol.md](atomic_design_protocol.md):

```
Ask three questions:

1. Composition Test: Does it represent a multi-part UI section with clear layout responsibility?
   → YES: Organism | NO: Continue

2. Dependency Test: Does it compose other molecules?
   → YES: Organism | NO: Continue

3. Interaction Test: Does it require reusable interaction/presentation state beyond simple composition?
   → YES: Organism | NO: Molecule
```

**Result:** Place in `atoms/`, `molecules/`, or `organisms/`

### **Step 2: Determine UI Primitive vs. Custom**

```
Is this a shadcn component or UI primitive?

YES → Place in [level]/ui/[component-name]/
      (e.g., atoms/ui/button/)

NO → Place in [level]/[component-name]/
      (e.g., molecules/card/)
```

**For shadcn components:**

- Check the Next.js app first (in `components/ui/`)
- If not found, copy from [shadcn/ui official docs](https://ui.shadcn.com/)
- Always place in `ui/` subfolder

### **Step 3: Create the Component File**

**File:** `ComponentName.tsx`

```typescript
// ✅ Good structure
'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'rounded-lg font-semibold transition-colors',
        // Use CSS variables, not hardcoded values
        'text-[var(--text-primary)]',
        'bg-[var(--bg-button)]',
        // Use variants.ts for complex variations
        'px-4 py-2',
        className
      )}
    >
      {children}
    </button>
  )
}
```

### **Step 4: Create Variants File (If Needed)**

**File:** `ComponentName.variants.ts` — Only if component has **multiple style variants**

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("rounded-lg font-semibold transition-colors", {
  variants: {
    variant: {
      primary: "bg-[var(--bg-primary)] text-[var(--text-white)]",
      secondary: "bg-[var(--bg-secondary)] text-[var(--text-primary)]",
      outline: "border-2 border-[var(--border-primary)] bg-transparent",
    },
    size: {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export { buttonVariants };
```

**When to create `ComponentName.variants.ts`:**

- Component has 2+ style variations
- Variants are combinable (primary + sm, secondary + lg, etc.)
- Using CVA (class-variance-authority) for variant management

**When NOT to create:**

- Component has only one variant
- Variants are conditional (if-else, not combinable)
- Styling is simple enough to fit in the component file

### **Step 5: Create Storybook Stories File**

**File:** `ComponentName.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import Button, { type ButtonProps } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',  // Format: [Level]/[ComponentName]
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
  },
}

// Variant stories
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}

// Size variants
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
}

// Pattern story (composite example)
export const Pattern_ButtonGroup: Story = {
  args: {
    children: 'Save',
  },
  render: (args) => (
    <div className="flex gap-2">
      <Button {...args} variant="primary">
        Save
      </Button>
      <Button {...args} variant="secondary">
        Cancel
      </Button>
    </div>
  ),
}
```

### **Step 6: Create Barrel Export**

**File:** `index.ts`

```typescript
export { default, type ButtonProps } from "./Button";
export type { ButtonVariants } from "./variants"; // if variants file exists
```

**Never use `index.tsx`** — only `index.ts` for barrel exports.

---

## Story Organization & Naming

### **Title Convention**

```
[Atomic Level]/[Component Name]

Examples:
- Atoms/Button
- Atoms/ui/Select        (shadcn/ui components)
- Molecules/Card
- Molecules/SearchBar
- Organisms/Header
- Organisms/FeaturePanel
```

### **Pattern Stories**

For compositions that don't warrant a new component, add a pattern story:

```typescript
export const Pattern_FilterForm: Story = {
  render: () => (
    <Card>
      <Input placeholder="Search..." />
      <Button>Filter</Button>
    </Card>
  ),
}
```

---

## Component Rules Checklist

Before finalizing a component, verify:

### **Structure**

- [ ] Component is in correct atomic folder (`atoms/`, `molecules/`, or `organisms/`)
- [ ] UI primitives are in `[level]/ui/` subfolder
- [ ] Files follow naming: `ComponentName.tsx`, `ComponentName.stories.tsx`, `index.ts`
- [ ] Barrel export in `index.ts` exports component and types

### **Implementation**

- [ ] Component is a default export OR named export (consistent)
- [ ] Props interface documented with JSDoc
- [ ] No Next.js imports (`next/*`) — framework-agnostic only
- [ ] No data fetching or server logic
- [ ] No business rules, marketplace/domain entities, or product-specific workflows
- [ ] No hardcoded design values (colors, spacing, radius)

### **Styling**

- [ ] All colors use CSS variables: `text-[var(--color-name)]`
- [ ] All spacing uses Tailwind tokens or CSS variables
- [ ] Class merging uses `cn()` utility from `@/lib/utils`
- [ ] If variants exist, using CVA in `ComponentName.variants.ts`

### **Allowed Logic Boundaries**

- ✅ Allowed: visual state (`open`, `active`, `hover`, `selected`), interaction state, formatting/presentation helpers, accessibility behavior
- ❌ Forbidden: data fetching, API orchestration, business/domain rules, marketplace-specific workflows, persistence/state from app services

### **Storybook**

- [ ] Story file exists: `ComponentName.stories.tsx`
- [ ] Story title follows `[Level]/[Name]` convention
- [ ] Multiple variants documented as separate stories
- [ ] At least one default story + variant examples
- [ ] Interactive controls (`argTypes`) for main props

---

## Creating Components from shadcn/ui

### **When to Use shadcn**

shadcn components go in `[level]/ui/[component-name]/`:

```
atoms/ui/button/       ← shadcn Button
atoms/ui/input/        ← shadcn Input
molecules/ui/dialog/   ← shadcn Dialog
```

### **How to Copy shadcn Components**

1. **Check app first:** Look in the Next.js app's `components/ui/`
   - If found → Copy the version from there (already adapted)
   - If not found → Continue to step 2

2. **Copy from shadcn docs:**
   - Visit [ui.shadcn.com](https://ui.shadcn.com)
   - Find the component
   - Copy the component code
   - Paste into your new file

3. **Verify & Adapt:**
   - Remove any Next.js-specific imports
   - Ensure `cn()` is imported from `@/lib/utils`
   - Update CSS variables to match your design tokens
   - Add JSDoc comments for props

### **Example: Copying Button from shadcn**

Original from shadcn might look like:

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// ... component code
```

Adapted for design-system:

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils"; // ← Adjust import path

// ... rest of component code (unchanged)
```

---

## File Structure Examples

### **Example 1: Custom Atom (No Variants)**

```
atoms/badge/
├── Badge.tsx
├── Badge.stories.tsx
└── index.ts
```

### **Example 2: shadcn UI Atom (With Variants)**

```
atoms/ui/button/
├── Button.tsx           (from shadcn)
├── Button.stories.tsx
├── Button.variants.ts   (CVA variants)
└── index.ts
```

### **Example 3: Custom Molecule**

```
molecules/input-group/
├── InputGroup.tsx       (composes Input + Label)
├── InputGroup.stories.tsx
└── index.ts
```

### **Example 4: UI Organism**

```
organisms/feature-panel/
├── FeaturePanel.tsx     (contains UI interaction state only)
├── FeaturePanel.stories.tsx
├── FeaturePanel.variants.ts   (optional: size/style variants)
└── index.ts
```

---

## Anti-Patterns

| Anti-Pattern                | Why It's Bad                        | Fix                                        |
| --------------------------- | ----------------------------------- | ------------------------------------------ |
| **No stories**              | Component undocumented in Storybook | Always create `.stories.tsx`               |
| **Hardcoded colors**        | Breaks theming consistency          | Use CSS variables: `text-[var(--color)]`   |
| **Next.js imports**         | Breaks framework agnosticism        | Use generic props instead                  |
| **No ComponentName.variants.ts** | Complex styling logic in component  | Extract to `ComponentName.variants.ts` using CVA |
| **Business/domain logic**   | Breaks design-system agnosticism    | Move logic to app layer; keep UI-only APIs |
| **Mixed file naming**       | Creates confusion                   | Consistent `PascalCase.tsx` for components |
| **Missing index.ts**        | Can't barrel export                 | Always include index.ts                    |
| **`index.tsx` for barrels** | Causes import conflicts             | Use `index.ts` only                        |

---

## Related Docs

- [atomic_design_protocol.md](atomic_design_protocol.md) — Classify components (Atom/Molecule/Organism)
- [3u-protocol.md](3u-protocol.md) — Decide when to create new component vs. pattern story
- [naming-conventions.md](naming-conventions.md) — File and folder naming standards
- [../AGENTS.md](../AGENTS.md) — Design-system architecture overview
