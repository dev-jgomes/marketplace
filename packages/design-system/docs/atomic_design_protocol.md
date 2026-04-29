# Atomic Design & Migration Protocol

## 1. Classification Framework

| Level        | Definition                                                | Technical Requirements                           | Storybook Prefix |
| :----------- | :-------------------------------------------------------- | :----------------------------------------------- | :--------------- |
| **Atom**     | Smallest functional unit. Cannot be broken down.          | Framework-agnostic. No domain logic.             | `Atoms/`         |
| **Molecule** | A group of atoms functioning as a single unit.            | Domain-agnostic. Context-independent.            | `Molecules/`     |
| **Organism** | Complex interface section representing a business entity. | Composes molecules/atoms. Contains domain logic. | `Organisms/`     |

---

## 2. The "Organism vs. Molecule" Decision Matrix

Use these three tests to classify a component:

1.  **The Entity Test:** Does this component represent a specific marketplace entity (e.g., Product, Seller, Order)?
    - **Yes** → **Organism** (e.g., `ProductCard`)
    - **No** → **Molecule** (e.g., `PreviewCard`)
2.  **The Dependency Test:** Does this component compose other _Molecules_?
    - **Yes** → **Organism**
    - **No** → **Molecule/Atom**
3.  **The Logic Test:** Does it contain conditional logic for business rules (e.g., "if discounted," "if out of stock")?
    - **Yes** → **Organism**
    - **No** → **Molecule**

---

## 3. Implementation Rules

### Folder Structure

- **UI Primitives (shadcn):** Must reside in `[level]/ui/[component]`.
- **Custom Components:** Must reside in `[level]/[category]/[component]`.

## 4. Component Review Checklist for AI Agents

- [ ] Component is located in the correct atomic folder.
- [ ] Storybook file is colocated with the component file.
- [ ] Title in `.stories.tsx` follows the `[Level]/[Category]/[Name]` convention.
- [ ] No framework-specific (Next.js/Clerk/etc) imports are present.
- [ ] `cn()` utility is used for all class merging.
- [ ] All colors/spacing use CSS variables mapped via Tailwind v4.
