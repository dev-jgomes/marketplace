# Components — Patterns & Composition

**Quick Answer:** Compose UI by layering design-system components (atoms/molecules) with app-level feature logic (grids, filters, data mapping). Create app components only when design-system doesn't provide the needed abstraction. Avoid duplicating UI across the app and monorepo.

---

## When This Matters

Every time you:

- Create a new component
- Decide whether a component belongs in the app or design-system
- Compose multiple smaller components together
- Add business logic to a component
- Reuse a UI pattern across pages

---

## Component Hierarchy

The app uses a **three-layer composition model:**

```
App Components (feature/business logic)
        ↓
Design-System Components (reusable UI blocks)
        ↓
Primitives (Radix UI, Lucide icons, Tailwind)
```

### **Layer 1: Design-System Components**

**What:** Pure UI components, framework-agnostic, no business logic.

**Examples:**

- Atoms: `Button`, `Badge`, `Input`, `Textarea`, `Separator`
- Molecules: `Card`, `Dialog`, `PreviewCard`, `InputGroup`
- Organisms: `ProductCard`, `Navbar`, `Footer`

**How to use:** Import from `@marketplace/design-system` and compose them in app components.

### **Layer 2: App Components**

**What:** Feature-specific or business-aware components that compose design-system UI.

**Examples:**

- `ProductGrid` — Maps product data, renders `ProductCard` components
- `CategoryGrid` — Maps category data, renders `PreviewCard` components
- `Navbar` — Wraps design-system `Navbar`, adds app routing logic

**Scope:**

- `layout/` — Structural (headers, footers, wrappers)
- `store/` — Feature-specific (grids, filters, forms)
- `ui/` — Custom primitives (button variants, input wrappers)

### **Layer 3: Primitives**

**What:** Base UI libraries (Radix UI, Lucide, Tailwind, shadcn).

**How to use:** Rarely import directly. Design-system components wrap primitives. Only import if design-system doesn't cover your use case (rare).

---

## Decision Tree: App Component vs. Design-System Component

```
Need a new component? Ask:

1. Will it be used in multiple apps/frameworks in the future?
   YES → Design-system (framework-agnostic UI)
   NO  → Continue to step 2

2. Does it contain business logic or app-specific knowledge?
   YES → App component
   NO  → Continue to step 3

3. Is it a small UI element (button, badge, input)?
   YES → Check if design-system has it
        → YES: use design-system import
        → NO: create in app/components/ui/
   NO  → Continue to step 4

4. Is it a container/layout that composes smaller UI?
   YES → App component (feature-scoped)
   NO  → Probably a molecule in design-system

Examples:

✅ App Component: ProductGrid (maps data, renders ProductCard, handles filters)
✅ App Component: CategoryFilter (feature-specific, knows about store categories)
✅ Design-System: ProductCard (pure UI, no business logic)
✅ Design-System: Button (primitive UI element)

❌ Bad: Putting business logic in design-system components
❌ Bad: Creating custom button in app when design-system Button exists
❌ Bad: Duplicating ProductCard UI across app and design-system
```

---

## Component Patterns

### **Pattern 1: Data Mapping (Grids/Lists)**

**Purpose:** Transform data arrays into visual lists using design-system components.

**Structure:**

```
App Component (ProductGrid.tsx)
├── Accepts: data array + configuration
├── Maps: data → component instances
└── Renders: Design-system components (ProductCard)
```

**Characteristics:**

- Receives data as props
- Uses `.map()` to render collections
- Injects custom actions/callbacks into design-system components
- Handles responsive grid layouts

**Example pattern:**

```typescript
export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onFavorite={() => handleFavorite(product.id)}
        />
      ))}
    </div>
  )
}
```

### **Pattern 2: Wrapper/Composition**

**Purpose:** Enhance design-system components with app-specific behavior or styling.

**Structure:**

```
App Component (Navbar.tsx)
├── Wraps: Design-system Navbar
├── Adds: Routing logic, navigation state
└── Composes: with other app components
```

**When to use:**

- Adding client-side interactivity to design-system components
- Combining multiple design-system components into a new abstraction
- App-specific styling or configuration

**Example pattern:**

```typescript
'use client'
import { Navbar as DSNavbar } from '@marketplace/design-system'

export default function Navbar() {
  return (
    <DSNavbar>
      {/* app-specific content */}
    </DSNavbar>
  )
}
```

### **Pattern 3: Form / Input Collection**

**Purpose:** Compose design-system inputs into forms with validation and submission logic.

**Structure:**

```
App Component (FilterForm.tsx)
├── Composes: Input, Select, Button from design-system
├── Manages: Form state + validation
└── Submits: Data to parent component or API
```

**When to use:**

- Multi-field forms
- Filters or search interfaces
- Any input collection

### **Pattern 4: Conditional Rendering**

**Purpose:** Show/hide UI based on app state or props.

**Structure:**

```
App Component
├── Receives: state or feature flags
├── Conditionally renders: Design-system components
└── Handles: Loading, error, and empty states
```

**When to use:**

- Showing/hiding features based on user role
- Loading states while fetching data
- Empty/no-results states

---

## Client vs. Server Components

### **Heuristic: When to Use `'use client'`**

```
Component needs interactivity (events, state, hooks)?
YES → use 'use client'
NO  → keep as Server Component (default)

Examples:

✅ Server Component:
  - Page layouts (no interactivity)
  - Data display (read-only)
  - Static content renders

✅ Client Component:
  - ProductGrid (maps over data with event handlers)
  - Filters (state + onChange handlers)
  - Navbar (click handlers for navigation)
  - Any component using useState, useEffect, onClick, etc.
```

---

## Composition Rules

### **Rule 1: Single Responsibility**

Each component should have **one reason to change:**

- `ProductGrid` → changes when data mapping logic changes
- `CategoryFilter` → changes when filter logic changes
- `Button` (design-system) → changes when button styling changes

**Anti-pattern:** A component that handles data fetching, filtering, rendering, and layout all at once.

### **Rule 2: Props Over Hardcoding**

Always accept configuration via props instead of hardcoding values:

```typescript
// ✅ Good
export function ProductGrid({ columns = 3, gap = 'md' }) {
  return <div className={`grid grid-cols-${columns} gap-${gap}`}>

// ❌ Bad
export function ProductGrid() {
  return <div className="grid grid-cols-3 gap-4">  // hardcoded
```

### **Rule 3: Compose Over Customize**

If you need a variation of a design-system component, compose it rather than creating a new component:

```typescript
// ✅ Good: Compose design-system Button
export function PrimaryButton(props) {
  return <Button variant="primary" {...props} />
}

// ❌ Bad: Custom button when design-system variant exists
export function MyCustomButton() {
  return <button className="bg-blue-600 ...">
```

### **Rule 4: Design-System Import Priority**

```
1. Check design-system: @marketplace/design-system
2. If not found, check app/components/
3. If not found, create in app/components/ui/ or feature scope
```

---

## Import Patterns

### **Correct:**

```typescript
// ✅ App component importing design-system
import { Button, Card } from "@marketplace/design-system";
import { ProductGrid } from "@/components/store/ProductGrid";

// ✅ Component importing utilities
import { cn } from "@/lib/utils";
```

### **Forbidden:**

```typescript
// ❌ Design-system importing from app
import { ProductGrid } from "@/components/store/ProductGrid"; // in design-system

// ❌ Direct primitive imports (use design-system wrapper)
import { Button as RadixButton } from "@radix-ui/react-primitive";
```

See [DEPENDENCIES.md](DEPENDENCIES.md) for complete import rules.

---

## Anti-Patterns

| Anti-Pattern                        | Why It's Bad                            | Fix                                                        |
| ----------------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| **UI duplication**                  | Same component in app and design-system | Choose one location, import from there                     |
| **Business logic in design-system** | Breaks framework agnosticism            | Move logic to app components                               |
| **Hardcoded design values**         | Breaks theming, causes inconsistency    | Use CSS variables, props, or design-system tokens          |
| **Over-nesting**                    | Component hierarchy becomes unreadable  | Flatten; extract intermediate components                   |
| **Props drilling**                  | Passing data through 5+ levels          | Consider context or composition                            |
| **God components**                  | Component does everything               | Split into smaller components with single responsibilities |

---

## Related Docs

- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) — Where components live
- [NAMING-CONVENTIONS.md](NAMING-CONVENTIONS.md) — Component file and export naming
- [DEPENDENCIES.md](DEPENDENCIES.md) — Import boundaries and rules
