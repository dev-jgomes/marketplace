# The "3-U" Individualization Protocol

**Scope:** Design System Architecture  
**Objective:** Standardize when a component composition should be a "Story Pattern" versus a standalone "Individualized Component."

## 1. Core Principle

To prevent library bloat, we distinguish between Base Building Blocks and Functional Compositions. A composition is only promoted to a standalone component when it meets the 3-U Threshold.

## 2. The Decision Matrix

| Rule               | Category  | Threshold for Individualization                                                                                        |
| ------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| **U1: Usage**      | Quantity  | Is this composition used in 3 or more distinct screens, flows, or products?                                             |
| **U2: Unique API** | Function  | Does this require a custom data contract (unique props) that the base component does not support?                      |
| **U3: Unit Logic** | Stability | Does it require reusable UI state or interaction logic (e.g., conditional visual states, formatting, or event wiring)? |

## 3. Implementation Workflow

### Scenario A: Failed Threshold (< 3-U)

- **Result:** Keep as a Pattern Story
- **Definition:** A specific way of arranging existing components without creating a new exported file
- **Action:** Add a new story to the base component's `.stories.tsx` file
- **Story Title:** `Patterns / [Category] / [Pattern Name]`
- **Purpose:** Serves as a documentation "recipe" for developers to follow

### Scenario B: Met Threshold (≥ 3-U)

- **Result:** Individualize as a New Molecule or Organism
- **Definition:** A new, named component exported from the library
- **Action:** Create a dedicated directory (e.g., `molecules/SomethingCard/`)
- **Composition:** Must compose existing Atoms and Molecules. Do not redefine base styles
- **Purpose:** Provides a single source of truth for a repeatable, high-value UI pattern

## 4. Architectural Hierarchy

- **Atoms:** Smallest, indivisible units (Buttons, Inputs, Icons)
- **Molecules:** Simple groups of atoms bonded together (A Search Bar, a Form Field, a basic Card)
- **Organisms:** Complex groups of molecules joined to form a relatively distinct part of the interface (A Header, a Data Grid, a Sidebar)

## 5. Architectural Guardrails

- **Dependency Isolation:** Components must be framework-agnostic. Avoid library-specific imports (like framework routers) unless injected via props
- **Token Strictness:** All styling must derive from global CSS variables/tokens. No hardcoded magic numbers
- **Encapsulation:** Individualized components should be self-contained and exported via a central index file
- **Domain Agnosticism:** Do not encode business workflows, API/data orchestration, or marketplace-specific entities in design-system components
- **UI-Only Logic:** Allowed logic is limited to presentation concerns (visual state, interaction state, accessibility, and composition)

## 6. Developer/AI Instruction

> Evaluate this component composition against the 3-U Protocol. If it fails the threshold, implement it as a Pattern Story within the base component's story file. If it passes, provide the file structure for a new individualized component.

---

## Related Docs

- [COMPONENT-CREATION.md](COMPONENT-CREATION.md) — Complete component creation workflow
- [atomic_design_protocol.md](atomic_design_protocol.md) — Classify components (Atom/Molecule/Organism)
- [naming-conventions.md](naming-conventions.md) — Naming standards
- [../AGENTS.md](../AGENTS.md) — Architecture overview
