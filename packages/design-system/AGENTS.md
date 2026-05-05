# Design System — Architecture & AI Guidelines

A framework-agnostic UI library that can be consumed by any app and Storybook. This document is a **quick reference index** for architecture decisions. AI agents and developers should refer to the detailed docs for decision guidance.

---

## 🏗 Core Architecture

The design system follows **Atomic Design** organized into levels:

```
Atoms ← Smallest reusable units (primitives, shadcn components)
  ↓
Molecules ← Groups of atoms with simple composition
  ↓
Organisms ← Complex interface sections with UI interaction logic
```

**Key Principle:** Framework-agnostic and reusable. No Next.js imports, no app dependencies.

---

## 📚 Documentation Index

### **Where Do I...?**

| Question                      | Doc                                                                                           |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| Create a new component?       | [COMPONENT-CREATION.md](docs/COMPONENT-CREATION.md) — File structure & Storybook setup        |
| Classify component level?     | [atomic_design_protocol.md](docs/atomic_design_protocol.md) — Atom/Molecule/Organism decision |
| Decide component vs. pattern? | [3u-protocol.md](docs/3u-protocol.md) — 3-U threshold for individualization                   |
| Name files and folders?       | [naming-conventions.md](docs/naming-conventions.md) — Naming standards                        |

---

## ⚡ Quick Rules

### **Component Structure**

- ✅ Every component has: `ComponentName.tsx`, `ComponentName.stories.tsx`, `index.ts`
- ✅ Optional: `ComponentName.variants.ts` for multi-variant components only
- ✅ Shadcn components go in `[level]/ui/[component-name]/`
- ✅ Custom components go in `[level]/[component-name]/`

### **Atomic Design Levels**

- **Atoms** — Primitives (Button, Input, Badge, Icon)
- **Molecules** — Simple compositions (Card, SearchBar, InputGroup)
- **Organisms** — Complex sections with UI logic (Header, FeaturePanel, Footer)

### **Naming**

- Folders: `kebab-case` (e.g., `feature-panel/`)
- Component files: `PascalCase.tsx` (e.g., `FeaturePanel.tsx`)
- Barrel exports: `index.ts` only (never `index.tsx`)
- Stories: `PascalCase.stories.tsx` (e.g., `FeaturePanel.stories.tsx`)

### **Storybook Titles**

- Format: `[Level]/[Name]` or `[Level]/ui/[Name]` (for shadcn)
- Examples: `Atoms/Button`, `Atoms/ui/Input`, `Molecules/Card`, `Organisms/FeaturePanel`
- Pattern stories: `[Level]/Patterns/[PatternName]`

### **Framework Agnosticism**

- ❌ NO `next/*` imports (no `next/link`, `next/font`, `next/image`)
- ❌ NO data fetching or server logic
- ❌ NO hardcoded design values (colors, spacing, radius)
- ✅ Use CSS variables: `text-[var(--color-primary)]`
- ✅ Use `cn()` utility for class merging

### **Allowed Logic Boundaries**

- ✅ Allowed: visual state, interaction state, accessibility behavior, formatting/presentation helpers
- ❌ Forbidden: data fetching, API orchestration, business/domain rules, marketplace-specific workflows, app-service integration

### **shadcn Components**

- Check the Next.js app first (`components/ui/`)
- If not found, copy from [shadcn/ui docs](https://ui.shadcn.com/)
- Always place in `[level]/ui/[component-name]/`
- Adapt imports: replace `@/lib/utils` with relative path

### **Forbidden**

- ❌ Next.js-specific imports
- ❌ Direct imports from Storybook in app code
- ❌ Hardcoded design tokens
- ❌ Business/domain logic in design-system components
- ❌ `index.tsx` files (use `index.ts` only)

---

## 🔗 Classification Decision Tree

```
Creating a new component? Ask:

1. Composition Test: Multi-part UI section with clear layout responsibility?
   YES → Organism | NO → Continue

2. Dependency Test: Composes other molecules?
   YES → Organism | NO → Continue

3. Interaction Test: Reusable interaction/presentation state?
   YES → Organism | NO → Molecule or Atom

Result: Place in atoms/, molecules/, or organisms/
```

---

## 📋 3-U Threshold

When to create a new component vs. pattern story:

| Criteria           | Threshold               | Decision           |
| ------------------ | ----------------------- | ------------------ |
| **U1: Usage**      | Used 3+ times           | Consider component |
| **U2: Unique API** | Custom props needed     | Consider component |
| **U3: Unit Logic** | Internal logic required | Consider component |

**Meets all 3-U?** → Create standalone component  
**Fails threshold?** → Keep as pattern story in base component

---

## 📖 For AI Agents & Copilot

When generating or modifying components:

1. **Check** [atomic_design_protocol.md](docs/atomic_design_protocol.md) to classify level (Atom/Molecule/Organism)
2. **Check** [3u-protocol.md](docs/3u-protocol.md) to decide if it warrants a new component
3. **Follow** [COMPONENT-CREATION.md](docs/COMPONENT-CREATION.md) for file structure and Storybook setup
4. **Follow** [naming-conventions.md](docs/naming-conventions.md) for consistent naming
5. **Verify** all rules in [COMPONENT-CREATION.md](docs/COMPONENT-CREATION.md) checklist before finalizing

This ensures generated components follow the established architecture and integrate seamlessly with Storybook.

---

## 🔗 Related Documentation

- **App architecture:** See [../../docs/AGENTS.md](../../docs/AGENTS.md)
- **Package README:** See [README.md](README.md)
