"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Separator } from "../../atoms/ui/separator";
import {
  footerVariants,
  footerLinkVariants,
  type FooterVariantProps,
} from "./Footer.variants";

export interface FooterProps
  extends React.ComponentPropsWithoutRef<"footer">, FooterVariantProps {
  logo: React.ReactNode;
  sections: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  copyText: string;
  LinkComponent?: React.ElementType;
}

export function Footer({
  logo,
  sections,
  copyText,
  variant,
  size,
  className,
  LinkComponent = "a",
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(footerVariants({ variant, size }), className)}
      {...props}
    >
      <div className="mx-auto container">
        {/* Main Content Area */}
        <div className="flex flex-col gap-(--spacing-footer-gap) md:flex-row md:justify-between md:items-start">
          <div className="shrink-0 mb-4 md:mb-0">{logo}</div>

          {variant !== "minimal" && (
            <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 lg:gap-x-24">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="flex flex-col gap-(--spacing-section-gap)"
                >
                  <h4 className="text-xs font-bold uppercase tracking-widest text-fg-main opacity-90">
                    {section.title}
                  </h4>
                  <nav className="flex flex-col gap-3">
                    {section.links.map((link) => (
                      <LinkComponent
                        key={link.label}
                        href={link.href}
                        className={footerLinkVariants({ variant })}
                      >
                        {link.label}
                      </LinkComponent>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vertical Rhythm: Separator Spacing */}
        <Separator
          className={cn(
            "mt-16 mb-8",
            variant === "dark" ? "bg-white/10" : "bg-border",
          )}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-xs text-fg-muted opacity-80">{copyText}</p>
          <div className="flex items-center gap-8 text-xs text-fg-muted">
            <LinkComponent
              href="/privacy"
              className="hover:text-fg-main transition-colors"
            >
              Privacy
            </LinkComponent>
            <LinkComponent
              href="/terms"
              className="hover:text-fg-main transition-colors"
            >
              Terms
            </LinkComponent>
            <LinkComponent
              href="/cookies"
              className="hover:text-fg-main transition-colors"
            >
              Cookies
            </LinkComponent>
          </div>
        </div>
      </div>
    </footer>
  );
}
