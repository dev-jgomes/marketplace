# Marketplace App — AI Rules

## 🧱 Architecture

- Root project is a Next.js application
- `packages/design-system` is the shared UI library
- The app composes UI using the design-system

---

## 🔗 Dependencies

- App CAN import from `@marketplace/design-system`
- Design-system MUST NOT import from the app

---

## 🎨 Styling

- Tailwind config is defined at root and MUST use the design-system preset
- Global styles (`globals.css`) MUST import shared tokens from design-system
- DO NOT duplicate Tailwind config or CSS variables

---

## 🧩 UI Rules

- Prefer design-system components over custom ones
- Keep pages thin and declarative
- No UI duplication between app and design-system

---

## 🚫 Forbidden

- No business logic inside design-system
- No direct imports from Storybook
- No hardcoded design values (colors, spacing, radius)

---

## ✅ Preferred

- Compose UI using reusable components
- Keep logic separated from presentation
