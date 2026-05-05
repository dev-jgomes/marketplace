### Key Protocol Summary:

1.  **Folders:** `kebab-case` (consistent with CSS tokens and deployment-safe).
2.  **Component Files:** `PascalCase.tsx` (standard React mapping).
3.  **The Index Rule:** No `index.tsx` for components. Use `index.ts` only for barrel exports at the category/package levels.
4.  **The Logic Split:** Use `camelCase.ts` for hooks and utilities to visually distinguish them from UI components in the tree.

---

## Related Docs

- [COMPONENT-CREATION.md](COMPONENT-CREATION.md) — File structure and Storybook setup
- [atomic_design_protocol.md](atomic_design_protocol.md) — Component classification
- [../AGENTS.md](../AGENTS.md) — Architecture overview
