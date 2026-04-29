### Key Protocol Summary:

1.  **Folders:** `kebab-case` (consistent with CSS tokens and deployment-safe).
2.  **Component Files:** `PascalCase.tsx` (standard React mapping).
3.  **The Index Rule:** No `index.tsx` for components. Use `index.ts` only for barrel exports at the category/package levels.
4.  **The Logic Split:** Use `camelCase.ts` for hooks and utilities to visually distinguish them from UI components in the tree.
