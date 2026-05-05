# Atomic Design & Migration Protocol

## 1. Classification Framework

| Level        | Definition                                                | Technical Requirements                           | Storybook Prefix |
| :----------- | :-------------------------------------------------------- | :----------------------------------------------- | :--------------- |
| **Atom**     | Smallest functional UI unit. Cannot be broken down.             | Framework-agnostic. Presentation-only.             | `Atoms/`         |
| **Molecule** | A group of atoms functioning as a single unit.                  | Domain-agnostic. Context-independent.              | `Molecules/`     |
| **Organism** | Complex interface section with clear layout and interactions.   | Composes molecules/atoms. UI interaction logic only. | `Organisms/`  |

---

## 2. The "Organism vs. Molecule" Decision Matrix

Use these three tests to classify a component:

1.  **The Composition Test:** Does this component represent a multi-part UI section with clear layout responsibility?
    - **Yes** → **Organism** (e.g., `FeaturePanel`)
    - **No** → **Molecule** (e.g., `PreviewCard`)
2.  **The Dependency Test:** Does this component compose other _Molecules_?
    - **Yes** → **Organism**
    - **No** → **Molecule/Atom**
3.  **The Interaction Test:** Does it contain reusable interaction/presentation logic (e.g., accordion state, tab state, formatting)?
    - **Yes** → **Organism**
    - **No** → **Molecule**

---

## 3. Implementation Rules

### Folder Structure

- **UI Primitives (shadcn):** Must reside in `[level]/ui/[component]`.
- **Custom Components:** Must reside in `[level]/[component]`.

## 4. Component Review Checklist for AI Agents

- [ ] Component is located in the correct atomic folder.
- [ ] Storybook file is colocated with the component file.
- [ ] Title in `.stories.tsx` follows the `[Level]/[Name]` convention.
- [ ] No framework-specific (Next.js/Clerk/etc) imports are present.
- [ ] No business workflows, marketplace/domain entities, or API orchestration logic.
- [ ] `cn()` utility is used for all class merging.
- [ ] All colors/spacing use CSS variables mapped via Tailwind v4.

---

## Related Docs

- [COMPONENT-CREATION.md](COMPONENT-CREATION.md) — Complete component creation workflow
- [3u-protocol.md](3u-protocol.md) — Decide when to create new component
- [naming-conventions.md](naming-conventions.md) — Naming standards
- [../AGENTS.md](../AGENTS.md) — Architecture overview
