# Marketplace App — Architecture & AI Guidelines

A Next.js web application that orchestrates business logic and composes UI from a framework-agnostic design system library. This document is a **quick reference index** for architecture decisions. AI agents and developers should refer to the detailed docs for decision guidance.

---

## 🏗 Core Architecture

The app separates concerns into three layers:

```
App Layer (business logic, routing, data)
    ↓ imports from
Design-System Layer (pure UI, reusable components)
    ↓ uses
Primitives (React, Radix UI, Lucide, Tailwind)
```

**Key Principle:** One-way dependency graph — app can import design-system, but design-system must never import from app.

---

## 📚 Documentation Index

### **Where Do I...?**

| Question                            | Doc                                                                         |
| ----------------------------------- | --------------------------------------------------------------------------- |
| Add a new page or feature?          | [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) — File placement decision tree |
| Create a new component?             | [COMPONENTS.md](COMPONENTS.md) — Component patterns & composition rules     |
| Name a file, function, or variable? | [NAMING-CONVENTIONS.md](NAMING-CONVENTIONS.md) — Naming standards           |
| Add an import statement?            | [DEPENDENCIES.md](DEPENDENCIES.md) — Import rules & boundaries              |

---

## ⚡ Quick Rules

### **Dependencies**

- ✅ `app/` can import from `@marketplace/design-system`
- ✅ `app/` can import from `@/lib`, `@/components`, `@/types`
- ❌ `packages/design-system` MUST NOT import from `app/`

### **File Organization**

- `app/` — Routes and pages (Next.js App Router)
- `components/` — Feature and presentation components
- `lib/` — Shared utilities, hooks, constants
- `packages/design-system/` — Reusable UI library

### **Naming**

- Components: `PascalCase.tsx` (e.g., `ProductGrid.tsx`)
- Folders: `kebab-case/` (e.g., `store/`, `lib/hooks/`)
- Functions: `camelCase()` (e.g., `formatPrice()`)
- Hooks: `useIsh()` (e.g., `useCart()`)
- Constants: `CONSTANT_CASE` (e.g., `MAX_ITEMS`)

### **Components**

- Prefer design-system components over custom ones
- Compose UI using data mapping patterns (grids, lists)
- Keep business logic out of design-system
- Use `'use client'` only when interactivity is needed

### **Styling**

- Use CSS variables and design-system tokens
- NO hardcoded design values (colors, spacing, radius)
- Tailwind classes through `cn()` utility for merging
- Global styles in `app/globals.css`

### **Forbidden**

- ❌ Design-system importing from app
- ❌ Direct imports from Storybook in app code
- ❌ Hardcoded colors, spacing, or other design tokens
- ❌ Business logic inside design-system components
- ❌ UI duplication across app and design-system

---

## 🔗 Related Documentation

- **Monorepo overview:** See root [README.md](../README.md)
- **Design-system docs:** See [packages/design-system/README.md](../packages/design-system/README.md)

---

## 📖 For AI Agents & Copilot

When generating or modifying code:

1. **Check** [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) to determine file location
2. **Check** [COMPONENTS.md](COMPONENTS.md) to decide component patterns
3. **Check** [NAMING-CONVENTIONS.md](NAMING-CONVENTIONS.md) for file and function names
4. **Check** [DEPENDENCIES.md](DEPENDENCIES.md) before adding imports

This ensures generated code follows the established architecture and integrates seamlessly with the codebase.
