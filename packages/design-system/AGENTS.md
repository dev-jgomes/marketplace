# Design System — AI Rules

## 🎯 Purpose

Framework-agnostic UI library used by the app and Storybook.

---

## 🧱 Structure

- Components follow Atomic Design:
  - atoms
  - molecules
  - organisms
  - layouts

- Stories are colocated with components

---

## 📚 Storybook

- Each component MUST have a story
- Use `title` to define hierarchy (e.g. "Atoms/Button")
- Storybook is the visual source of truth

---

## 🎨 Styling

- Tailwind preset is defined in `tailwind/preset.ts`
- Tokens are defined in `src/styles/tokens.css`
- DO NOT redefine tokens elsewhere

---

## 🧩 Components

- Must be reusable and composable
- Accept props for flexibility
- No coupling to specific pages or business logic

---

## 🔗 Dependencies

- Can be consumed by apps
- MUST NOT depend on any app or Next.js APIs

---

## 🚫 Forbidden

- No Next.js imports
- No routing, data fetching, or server logic
- No hardcoded design values

---

## ✅ Utilities

- Use shared `cn()` utility for class merging
- Keep logic minimal and UI-focused
