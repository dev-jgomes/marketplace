# Dependencies & Boundaries

**Quick Answer:** The app CAN import from `@marketplace/design-system`, but design-system MUST NOT import from the app. This enforces a one-way dependency graph, keeping the UI library reusable across frameworks.

---

## When This Matters

Every time you:

- Add a new import statement
- Create a new module or component
- Organize code into packages
- Plan to reuse components in other projects
- Debug circular dependency errors

Correct boundaries prevent architectural decay and keep the monorepo maintainable as it scales.

---

## Dependency Graph

```
┌─────────────────────────────────────────────┐
│         Marketplace App (Next.js)           │
│         (next.config.ts, app/*, etc.)      │
└────────────────────▲────────────────────────┘
                     │ (CAN import)
                     │
                     │ @marketplace/design-system
                     │ (pure UI, no app logic)
                     │
                  Primitives
            (Radix, Lucide, Tailwind, etc.)
```

### **Key Rule:**

```
✅ App → Design-System (ONE WAY)
❌ Design-System → App (FORBIDDEN)
✅ Both → Primitives (ok)
```

---

## Import Rules

### **Rule 1: Design-System Imports (from App)**

**Allowed:**

```typescript
// ✅ Import components
import { Button, Card, Badge } from "@marketplace/design-system";

// ✅ Import types
import type { ButtonProps } from "@marketplace/design-system";

// ✅ Import utilities
import { cn } from "@marketplace/design-system";

// ✅ Import constants (if exposed)
import { COLORS, SPACING } from "@marketplace/design-system";
```

**Location:** App components, pages, utilities, hooks — anywhere in `app/`, `components/`, `lib/`.

### **Rule 2: Design-System Imports (FORBIDDEN)**

**Not allowed in `packages/design-system/`:**

```typescript
// ❌ FORBIDDEN: Importing from app
import { ProductGrid } from "@/components/store/ProductGrid";
import { formatMarketplacePrice } from "@/lib/utils";
import type { Marketplace } from "@/types/marketplace";

// ❌ FORBIDDEN: Importing from app via relative paths
import { something } from "../../../app/...";
```

**Why:** Design-system must be framework-agnostic and reusable. App-specific logic breaks portability.

### **Rule 3: Path Aliases**

**App paths:**

```typescript
import { ... } from '@/components/...'     // ✅ app components
import { ... } from '@/lib/...'            // ✅ app utilities
import { ... } from '@/types/...'          // ✅ app types
```

**Monorepo paths:**

```typescript
import { ... } from '@marketplace/design-system'  // ✅ design-system package
```

**Design-system internal paths:**

```typescript
// Within design-system only:
import { ... } from '@design-system/components'
import { ... } from '@design-system/lib'
```

---

## Package Scope

### **`packages/design-system` Scope**

**This package contains ONLY:**

- React components (atoms, molecules, organisms)
- Styling (Tailwind, CSS variables, tokens)
- UI utilities (class merging, type guards)
- Storybook documentation

**This package MUST NOT contain:**

- App-specific business logic
- API calls or data fetching
- App configuration or settings
- Navigation logic (routing)
- Authentication logic
- Any imports from `app/` or `components/`

---

## Monorepo Configuration

### **`next.config.ts`**

The app's Next.js config includes:

```typescript
const nextConfig: NextConfig = {
  transpilePackages: ["@marketplace/design-system"],
};
```

**What this does:**

- Ensures TypeScript and JSX in design-system are transpiled for Next.js
- Allows importing design-system in app without build errors
- Enables the one-way import boundary

### **Tailwind Configuration**

Root `tailwind.config.ts` includes design-system styles:

```typescript
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/design-system/src/**/*.{ts,tsx}", // ← includes DS paths
  ],
};
```

**What this does:**

- Scans design-system components for Tailwind classes
- Ensures design-system styles are bundled into app CSS
- Prevents unused styles from being pruned

---

## Forbidden Patterns

### **Anti-Pattern 1: Importing from Storybook**

```typescript
// ❌ FORBIDDEN
import { SomeComponent } from "@marketplace/design-system/storybook";
import { stories } from "@marketplace/design-system/src/components/Button.stories";
```

**Why:** Storybook is for documentation only, not app runtime.

**Fix:** Import from the component directly:

```typescript
// ✅ Correct
import { Button } from "@marketplace/design-system";
```

---

### **Anti-Pattern 2: Circular Imports**

```typescript
// App importing design-system
import { Button } from "@marketplace/design-system";

// Design-system importing app (breaks everything)
import { ProductGrid } from "@/components/store";
```

**Why:** Creates circular dependencies, breaks tree-shaking, causes build errors.

**Fix:** Move shared logic to a separate `lib/` that both can import.

---

### **Anti-Pattern 3: Hardcoded Design Values**

```typescript
// ❌ FORBIDDEN (in app or design-system)
const colors = {
  primary: '#4f46e5',
  secondary: '#10b981',
}

export function Button() {
  return <button style={{ color: colors.primary }}>
}

// ❌ FORBIDDEN
export function Card() {
  return <div className="p-4 rounded-lg border-1 border-gray-200">
}
```

**Why:** Breaks theming, causes duplication, makes maintenance hard.

**Fix:** Use design-system tokens:

```typescript
// ✅ Correct
export function Button() {
  return <button className="bg-brand-main text-white">
}

// ✅ Correct (with CSS variables)
export function Card() {
  return <div className="p-[var(--spacing-4)] rounded-[var(--radius-lg)]">
}
```

---

## Import Decision Tree

```
Need to import something? Ask:

1. Is it a UI component (button, card, badge)?
   YES → Check design-system first
        → Found? Import from @marketplace/design-system
        → Not found? Create in app/components/ui/ or request in design-system
   NO  → Continue to step 2

2. Is it app-specific logic (API calls, business rules)?
   YES → Import from @/lib, @/types, @/app
   NO  → Continue to step 3

3. Is it a utility or helper function?
   YES → Check design-system (@marketplace/design-system/lib)
        → Found? Import from design-system
        → Not found? Import from @/lib/utils
   NO  → Continue to step 4

4. Is it from a third-party library (React, Radix, Lucide)?
   YES → Prefer importing design-system wrapped version
        → Not available? Import directly from library
   NO  → Don't import this

When in doubt:
- First choice: design-system exports
- Second choice: app utilities (@/lib)
- Third choice: third-party libraries
- Last choice: relative imports
```

---

## Breaking Circular Dependencies

### **Problem: Circular Dependency**

```
app/components/store/ProductGrid.tsx
  ↓ imports
packages/design-system/src/components/ProductCard.tsx
  ↓ imports (WRONG)
app/types/product.ts
  ↓ imports (WRONG)
packages/design-system/...
```

### **Solution: Extract to Shared Location**

```
lib/types/product.ts (shared location)
  ↓
app/components/store/ProductGrid.tsx (imports type)
  ↓
packages/design-system/ProductCard.tsx (imports type)
```

Create a `lib/` or `types/` folder that both can import from, **but app cannot import from design-system**.

---

## Monorepo Structure Recap

```
marketplace/
├── app/                          ← Next.js app
│   ├── imports from: @marketplace/design-system, @/lib, third-party
│   └── NOT imported by: anything
│
├── components/                   ← App-level components
│   ├── imports from: @marketplace/design-system, @/lib, third-party
│   └── NOT imported by: design-system
│
├── lib/                          ← App utilities & shared types
│   ├── imports from: third-party only
│   └── NOT imported by: design-system (usually)
│
├── packages/design-system/       ← Reusable UI library
│   ├── src/components/           ← Pure UI components
│   ├── src/lib/                  ← UI utilities only
│   ├── imports from: third-party (Radix, Lucide, Tailwind)
│   ├── NOT imported from: app/, components/, lib/
│   └── CAN be imported by: app/
│
└── public/                       ← Static assets
```

---

## Testing Boundaries

### **Valid Import (Testing)**

```typescript
// ✅ App test file can import from app
import { ProductGrid } from '@/components/store/ProductGrid'
import type { Product } from '@/types'

describe('ProductGrid', () => { ... })
```

### **Invalid Import (Testing)**

```typescript
// ❌ Design-system test MUST NOT import from app
import { ProductGrid } from "@/components/store/ProductGrid"; // WRONG
import { someAppType } from "@/types"; // WRONG

// ✅ Design-system test imports design-system only
import { Button } from "@marketplace/design-system";
import { cn } from "@marketplace/design-system";
```

---

## Related Docs

- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) — Where files/packages live
- [COMPONENTS.md](COMPONENTS.md) — When to create components
- [NAMING-CONVENTIONS.md](NAMING-CONVENTIONS.md) — How to name exports
