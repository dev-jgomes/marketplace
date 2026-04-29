import { ReactNode } from "react";
import Link from "next/link";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* TODO: Implement Navbar and Footer from storybook */}
      <header className="border-b bg-surface-primary py-4 px-6 top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-8">
          <span className="text-xl font-bold text-brand-main">MARKETPLACE</span>
          <nav className="space-x-4 text-sm font-medium">
            <Link href="/" className="hover:text-brand-main">
              Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-4">{children}</main>

      <footer className="border-t bg-gray-50 py-8 text-center text-sm text-gray-500">
        © 2026 Marketplace Project. Built with Design System Library.
      </footer>
    </div>
  );
}
