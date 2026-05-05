# Marketplace Monorepo

A high-performance monorepo architecture separating the application orchestration layer from a framework-agnostic design system.

> **Observation:** This project structure is the result of an intensive **Migration Study**. All core components have been transitioned from the Next.js "Lab" environment into the standardized `@marketplace/design-system` library to ensure framework agnosticism and long-term reusability.

## 🏗 System Architecture

The repository is divided into two primary environments:

1.  **Web App (`apps/web`):** Built with **Next.js 15+**. Handles server-side logic, data fetching, authentication (Clerk), and marketplace business orchestration.
2.  **Design System (`packages/design-system`):** Built with **React 19**, **Storybook**, and **Tailwind CSS v4**. A self-contained UI library that serves as the visual source of truth.

## 🚀 Deployment Strategy

The monorepo manages two distinct Vercel deployments:

- **Production Web**
- **Design System/Docs**

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **UI Library:** React 19 / Storybook 10
- **Styling:** Tailwind CSS v4 (CSS-Variable-First)
- **Primitives:** Radix UI (Headless)
- **Icons:** Lucide React
- **Utilities:** `clsx`, `tailwind-merge`

## 📜 Development Rules

All contributors must adhere to the **Dependency Shadow Rule** and the **Parallel Path** architecture defined in the design system package. Use the root `.cursorrules` to ensure AI-assisted development remains compliant with these standards.
