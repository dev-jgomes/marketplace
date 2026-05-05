# Project Structure — Next.js App

**Quick Answer:** This Next.js app follows a layered architecture: routes organize pages and data flow, components organize UI and business logic, and shared utilities provide common functions. Choose file location based on scope: app-wide features go in `app/`, feature-scoped UI in `components/`, reusable utilities in `lib/`.

---

## When This Matters

Every time you:

- Add a new page or feature
- Create a new component or utility
- Organize imports for a new file
- Scale the app with more routes or complex logic

Understanding the structure prevents scattered files, makes refactoring predictable, and helps AI agents place new code consistently.

---

## Folder Organization

### **Root Level**

```
marketplace/
├── app/                    # Next.js App Router pages and layouts
├── components/             # Feature and presentation components
├── lib/                    # Shared utilities and helpers
├── packages/               # Monorepo packages (design-system)
├── public/                 # Static assets
└── [config files]          # tsconfig, tailwind, next.config, etc.
```

---

## **`app/` — Routes & Pages**

### **Purpose**

Home for all Next.js routes, layouts, and page logic. Organizes the navigational structure of your application.

### **Organization**

```
app/
├── layout.tsx              # Root layout (fonts, global wrappers)
├── globals.css             # Global styles + design-system tokens
├── (store)/                # Route group: storefront pages
│   ├── layout.tsx          # Store-specific layout (container wrapper)
│   ├── page.tsx            # Home page (/)
│   └── ...                 # Other store pages
├── category/               # Dynamic route for categories
│   └── [category]/
│       └── page.tsx        # Category page (/category/[slug])
├── lab/                    # Component exploration (development-only)
│   └── page.tsx            # Lab showcase
└── [future-feature]/       # New routes follow this pattern
```

### **Route Group Pattern**

**Use `(store)/` syntax when:**

- Multiple pages share a common layout or design pattern
- You want to organize related pages without affecting URL structure
- Example: Storefront pages (`/`, `/featured`) share the store layout but category pages don't

**Why:** Route groups let you nest layouts without creating URL segments. `(store)/page.tsx` renders at `/`, not `/(store)/`.

### **File Placement Decision Tree**

```
New feature? Ask:

1. Is it a routable page (has its own URL)?
   YES → goes in app/[feature-name]/page.tsx or app/(group)/page.tsx
   NO  → go to step 2

2. Is it UI shared across multiple app routes?
   YES → goes in components/ (see COMPONENTS.md)
   NO  → go to step 3

3. Is it a utility or helper function?
   YES → goes in lib/ (see below)
   NO  → place it in the page/component that uses it
```

### **Growth Pattern**

As you add routes, nest them logically:

```
app/
├── (store)/                # Storefront section
│   ├── layout.tsx
│   ├── page.tsx            # Home
│   ├── featured/
│   │   └── page.tsx        # /featured
│   └── sales/
│       └── page.tsx        # /sales
├── (admin)/                # Admin section (future)
│   ├── layout.tsx
│   ├── dashboard/
│   │   └── page.tsx        # /admin/dashboard
│   └── products/
│       └── page.tsx        # /admin/products
├── category/
│   └── [category]/
│       └── page.tsx        # /category/[slug]
└── auth/                   # Auth pages (future)
    ├── login/
    │   └── page.tsx        # /auth/login
    └── signup/
        └── page.tsx        # /auth/signup
```

---

## **`components/` — UI & Business Logic**

### **Purpose**

Home for reusable and feature-specific components that are used across pages. Organized by scope and responsibility.

### **Organization**

```
components/
├── index.ts               # Barrel export (re-exports all components)
├── layout/                # Structural components (headers, footers, wrappers)
│   ├── Navbar.tsx         # Page header
│   └── ...
├── store/                 # Storefront-specific feature components
│   ├── ProductGrid.tsx    # Maps product data to UI
│   ├── CategoryGrid.tsx   # Maps category data to UI
│   └── ...
└── ui/                    # Custom UI primitives
    ├── button.tsx         # Polymorphic button variant
    └── ...
```

### **Three Tiers Explained**

| Tier        | Purpose                              | Scope         | Example                            |
| ----------- | ------------------------------------ | ------------- | ---------------------------------- |
| **layout/** | Structural page layout components    | App-wide      | Navbar, Sidebar, Container         |
| **store/**  | Feature-specific business components | Feature scope | ProductGrid, CategoryGrid, Filters |
| **ui/**     | Custom UI primitives & variants      | Reusable      | Button variant, Input wrapper      |

**Decision:** Need a component?

- If it's used in **multiple pages** → consider `layout/` or `ui/`
- If it's **feature-specific** (e.g., only store pages) → use `store/`
- If it's a **layout wrapper** used app-wide → use `layout/`
- If it's a **small UI element** (button, input, badge) → check design-system first, then `ui/` if not available

### **Component Naming**

- Use **PascalCase** for component files: `ProductGrid.tsx`, `Navbar.tsx`
- File name = export name: `ProductGrid.tsx` exports `export default function ProductGrid() {}`
- Barrel exports in `index.ts` only (see NAMING-CONVENTIONS.md)

---

## **`lib/` — Shared Utilities**

### **Purpose**

Home for utility functions, helpers, and shared logic used across the app.

### **Organization**

```
lib/
├── utils.ts               # General utilities (cn, formatting, etc.)
├── api/                   # API calls & data fetching (future)
│   └── client.ts
├── hooks/                 # Custom React hooks (future)
│   ├── useCart.ts
│   └── useAuth.ts
└── constants/             # App-wide constants (future)
    └── categories.ts
```

### **When to Create `lib/` Files**

```
Shared utility? Ask:

1. Will it be used in 2+ files or components?
   YES → belongs in lib/

2. Is it pure logic (no React, no UI)?
   YES → lib/utils.ts or lib/[category]/

3. Is it a React hook (uses React APIs)?
   YES → lib/hooks/

4. Is it API/data fetching?
   YES → lib/api/

5. Is it a configuration or constant?
   YES → lib/constants/
```

### **Current Utilities**

- **`lib/utils.ts`**: Contains `cn()` utility (Tailwind class merging) and design-system re-exports

---

## **`public/` — Static Assets**

Home for images, fonts, and files served as-is. Accessed via `/filename` in the app.

---

## **Config Files**

| File                 | Purpose                                           |
| -------------------- | ------------------------------------------------- |
| `next.config.ts`     | Next.js settings (e.g., monorepo transpilation)   |
| `tailwind.config.ts` | Tailwind CSS configuration + design-system preset |
| `tsconfig.json`      | TypeScript configuration                          |
| `components.json`    | Component template settings                       |
| `postcss.config.mjs` | PostCSS configuration                             |
| `eslint.config.mjs`  | ESLint settings                                   |
| `package.json`       | Dependencies and scripts                          |

---

## Related Docs

- [COMPONENTS.md](COMPONENTS.md) — Component patterns and composition rules
- [NAMING-CONVENTIONS.md](NAMING-CONVENTIONS.md) — File and folder naming standards
- [DEPENDENCIES.md](DEPENDENCIES.md) — Monorepo import boundaries
