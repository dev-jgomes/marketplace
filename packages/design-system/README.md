# @marketplace/design-system

The central UI library package. This package is strictly framework-agnostic, domain-agnostic, and UI-focused.

## 🏛 Architecture: The Parallel Path

We use a strict **Atomic Design** hierarchy combined with a parallel sub-folder strategy to separate primitives from custom UI compositions.

**Folder Structure:**

- `atoms/ui/`: Shadcn/Radix primitives only.
- `atoms/[name]/`: Custom atoms.
- `molecules/ui/` | `molecules/[name]/`
- `organisms/ui/` | `organisms/[name]/`

**Naming Conventions:**

- **Directories:** `kebab-case`
- **Component Files:** `PascalCase`
- **Story Titles:** `[Level]/ui/[Name]` or `[Level]/[Name]`

## 🎨 Token Strategy: CSS-Variable-First

The **Source of Truth** for all design tokens resides in `src/styles/tokens.css`.

- We utilize **Tailwind CSS v4**'s native CSS variable integration.
- Avoid hardcoded hex values or arbitrary Tailwind values.
- All class merging must use the shared `cn()` utility located in `@/lib/utils`.

## 👻 The Dependency Shadow Rule

To ensure visual integrity in framework-agnostic environments (like Storybook), components must not rely on "Ghost Variables" injected by the host app (e.g., `next/font`).

**Requirement:**
If a component references a variable like `--font-sans`, this library's `globals.css` **must** provide a static fallback definition within the `:root`.

## ⚙️ Component Engineering Rules

1. **Framework Agnosticism:** Imports from `next/...` are strictly forbidden. Use generic props (e.g., `LinkComponent`) for navigation elements.
2. **Asset Integrity:** Use standard `string` paths for images. `StaticImageData` types are forbidden.
3. **Purity:** No data fetching, server-side logic, business workflows, or environment-specific headers allowed.
4. **Export Protocol:** All components must be exported through the primary entry point: `src/index.ts`.

### Allowed Logic Boundaries

- **Allowed:** UI/presentation logic only (visual states, interaction states, accessibility behavior, formatting helpers).
- **Forbidden:** data fetching, API orchestration, business/domain decisions, marketplace-specific workflows, and app-service integration logic.

## 📦 Package Scripts

- `pnpm storybook`: Launch the design system development environment.
- `pnpm build`: Bundle the library using Vite and generate TypeScript declarations.
- `pnpm lint`: Run ESLint with Storybook-specific plugin configurations.
