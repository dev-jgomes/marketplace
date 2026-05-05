# Naming Conventions

**Quick Answer:** Use `PascalCase` for component files, `kebab-case` for folders and routes, `camelCase` for utilities and hooks, and `CONSTANT_CASE` for constants. Barrel-export from `index.ts` only.

---

## When This Matters

Every time you:

- Create a new file (component, utility, hook, constant)
- Create a new folder or route
- Export multiple items from a module
- Name variables, functions, or props
- Set up imports across the app

Consistency helps AI agents understand code location and naming patterns, making auto-completion and code generation more reliable.

---

## File & Folder Naming

### **Components**

| Type             | Convention       | Example               | Location            |
| ---------------- | ---------------- | --------------------- | ------------------- |
| Component file   | `PascalCase.tsx` | `ProductGrid.tsx`     | `components/store/` |
| Component folder | `kebab-case/`    | `product-card/`       | Design-system only  |
| Barrel export    | `index.ts`       | Re-exports components | Component root      |

**Rules:**

- File name = exported component name
- One component per file (usually)
- Use `index.ts` for barrel exports only (no `index.tsx`)

**Examples:**

```typescript
// ✅ Correct
// File: components/store/ProductGrid.tsx
export default function ProductGrid() { ... }

// ✅ Correct (named export)
// File: components/ui/button.tsx
export function Button() { ... }
export function ButtonGroup() { ... }

// ❌ Incorrect
// File: productGrid.tsx (should be PascalCase)
// File: product-grid.tsx (should be PascalCase)
```

### **Folders & Routes**

| Type           | Convention      | Example                              |
| -------------- | --------------- | ------------------------------------ |
| Feature folder | `kebab-case/`   | `components/store/`, `lib/api/`      |
| Dynamic route  | `[param]/`      | `category/[category]/`, `user/[id]/` |
| Route group    | `(group-name)/` | `(store)/`, `(admin)/`               |
| Nested feature | `kebab-case/`   | `lib/hooks/`, `lib/constants/`       |

**Examples:**

```
app/
├── (store)/              ✅ Correct: route group with kebab-case
├── product-details/     ✅ Correct: feature folder
├── [category]/          ✅ Correct: dynamic segment
└── ProductDetails/      ❌ Incorrect: PascalCase for folder

components/
├── store/               ✅ Correct: kebab-case
├── ProductGrid.tsx      ✅ Correct: PascalCase component
└── productGrid.tsx      ❌ Incorrect: camelCase
```

---

## Function, Variable & Hook Naming

| Type              | Convention             | Example                                       |
| ----------------- | ---------------------- | --------------------------------------------- |
| Utility functions | `camelCase`            | `formatPrice()`, `cn()`                       |
| Custom hooks      | `useIsh`               | `useCart()`, `useAuth()`, `useLocalStorage()` |
| Event handlers    | `handleIsh` or `onIsh` | `handleClick()`, `onSubmit()`                 |
| Computed/derived  | `isIsh` or `hasIsh`    | `isLoading`, `hasError`, `isEmpty`            |
| Callback props    | `onIsh` or `handleIsh` | `onFavorite`, `onFilter`, `handleDelete`      |
| Constants         | `CONSTANT_CASE`        | `MAX_RETRIES`, `DEFAULT_PAGE_SIZE`            |

**Examples:**

```typescript
// ✅ Utility function
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

// ✅ Custom hook
export function useCart() {
  const [items, setItems] = useState([])
  return { items, addItem, removeItem }
}

// ✅ Event handler
function handleClick() { ... }
const handleSubmit = (data) => { ... }

// ✅ Boolean/state variable
const isOpen = true
const hasError = false
const isEmpty = items.length === 0

// ✅ Callback prop
interface ButtonProps {
  onClick: () => void
  onHover?: () => void
}

// ✅ Constant
const MAX_PRODUCTS_PER_PAGE = 20
const DEFAULT_SORT_ORDER = 'asc'
```

---

## Props & Component Arguments

| Context             | Convention                  | Example                              |
| ------------------- | --------------------------- | ------------------------------------ |
| HTML attributes     | Use standard names          | `className`, `onClick`, `disabled`   |
| Data props          | Descriptive noun            | `product`, `categories`, `user`      |
| Callback props      | `on` + past tense or action | `onFavorite`, `onDelete`, `onChange` |
| Config/option props | Descriptive adjective       | `isOpen`, `disabled`, `variant`      |
| Style props         | Use Tailwind classNames     | `className`                          |

**Examples:**

```typescript
// ✅ Good props interface
interface ProductGridProps {
  products: Product[]; // data
  columns?: number; // config
  gap?: "sm" | "md" | "lg"; // config
  onProductClick?: (id: string) => void; // callback
  className?: string; // styling
}

// ❌ Avoid generic names
interface BadProps {
  data: any; // too vague
  fn: () => void; // unclear purpose
  config: object; // too vague
}
```

---

## Export Patterns

### **Default Export (Single Export)**

Use for components that are the main export from a module:

```typescript
// ✅ File: components/store/ProductGrid.tsx
export default function ProductGrid() {
  return <div>...</div>
}

// Import:
import ProductGrid from '@/components/store/ProductGrid'
```

### **Named Exports (Multiple Exports)**

Use for utilities, types, or multiple components in one module:

```typescript
// ✅ File: lib/utils.ts
export function cn(...classes: string[]) { ... }
export function formatPrice(price: number) { ... }
export function formatDate(date: Date) { ... }

// Import:
import { cn, formatPrice, formatDate } from '@/lib/utils'
```

### **Barrel Exports (`index.ts`)**

Use `index.ts` to re-export multiple components for convenient imports:

```typescript
// ✅ File: components/index.ts
export { default as ProductGrid } from "./store/ProductGrid";
export { default as CategoryGrid } from "./store/CategoryGrid";
export { Navbar } from "./layout/Navbar";

// Import:
import { ProductGrid, CategoryGrid, Navbar } from "@/components";

// ✅ Also acceptable (explicit path):
import { ProductGrid } from "@/components/store/ProductGrid";
```

**Guidelines:**

- Only use `index.ts` for commonly grouped exports
- Don't create unnecessary `index.ts` files
- Prefer explicit imports when unsure

---

## Type & Interface Naming

| Type       | Convention                          | Example                                |
| ---------- | ----------------------------------- | -------------------------------------- |
| Interface  | `CapitalizedName`                   | `interface Product { ... }`            |
| Type alias | `CapitalizedName`                   | `type Status = 'active' \| 'inactive'` |
| Enum       | `CapitalizedName`                   | `enum SortOrder { ASC, DESC }`         |
| Generic    | `SingleLetter` or `DescriptiveName` | `<T>`, `<TData>`                       |

**Examples:**

```typescript
// ✅ Types
interface ProductGridProps {
  products: Product[]
  onSelect: (id: string) => void
}

type Status = 'pending' | 'active' | 'archived'

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

// Generic type
interface ApiResponse<T> {
  data: T
  status: number
}

// ❌ Avoid
type prodGridProps = { ... }  // should be interface or PascalCase
interface product { ... }      // should be capitalized
```

---

## Constants Organization

### **Where to Place Constants**

```typescript
// ✅ Local to file (if used only in one component)
// File: components/store/ProductGrid.tsx
const GRID_COLUMNS = 3
const GRID_GAP = 'md'

export function ProductGrid() { ... }

// ✅ Shared utility (used in multiple files)
// File: lib/constants.ts
export const MAX_PRODUCTS_PER_PAGE = 20
export const DEFAULT_SORT_ORDER = 'asc'

// ✅ Feature-specific (organized by feature)
// File: lib/constants/categories.ts
export const CATEGORIES = ['Electronics', 'Books', 'Clothing']
export const CATEGORY_COLORS = { Electronics: '#blue', Books: '#green' }
```

### **Naming Constants**

```typescript
// ✅ Clear, descriptive CONSTANT_CASE
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT_MS = 5000;
const API_BASE_URL = "https://api.example.com";
const BREAKPOINT_MOBILE = 768;

// ❌ Avoid
const maxRetries = 3; // should be CONSTANT_CASE
const MAX = 3; // unclear what MAX means
const CONSTANT = "value"; // too vague
```

---

## Anti-Patterns

| Pattern                                    | Why It's Bad                               | Fix                                                        |
| ------------------------------------------ | ------------------------------------------ | ---------------------------------------------------------- |
| **`index.tsx`**                            | Confuses component file with barrel export | Use `index.ts` for barrels; `Component.tsx` for components |
| **`productGrid.tsx`**                      | Inconsistent with component naming         | Use `ProductGrid.tsx`                                      |
| **`product-grid.tsx`**                     | Confuses with folder names                 | Use `ProductGrid.tsx` for components                       |
| **Mixed casing**                           | Hard to predict file location              | Choose convention, stick with it                           |
| **Single-letter variables** (except loops) | Unclear purpose                            | Use descriptive names (`isOpen` not `o`)                   |
| **`data`, `config`, `props`**              | Too generic                                | Use specific names (`products`, `filters`, `gridProps`)    |

---

## Quick Reference Checklist

- [ ] Components: `PascalCase.tsx`
- [ ] Folders: `kebab-case/`
- [ ] Routes: `[dynamic]/` or `(group)/`
- [ ] Functions/Utilities: `camelCase()`
- [ ] Hooks: `useCamelCase()`
- [ ] Constants: `CONSTANT_CASE`
- [ ] Booleans: `isPrefix` or `hasPrefix`
- [ ] Callbacks: `on` + Action
- [ ] Exports: default for single, named for multiple
- [ ] Barrel exports: `index.ts` only

---

## Related Docs

- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) — Where files live
- [COMPONENTS.md](COMPONENTS.md) — Component structure
- [DEPENDENCIES.md](DEPENDENCIES.md) — Import patterns
