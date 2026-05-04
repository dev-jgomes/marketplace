"use client";
import * as React from "react";
import { cn } from "../../../lib/utils"; // Relative path for Library autonomy
import { Button } from "../../atoms/ui/button";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
} from "../../molecules/ui/command";
import { Separator } from "../../atoms/ui/separator";

export interface SearchResult {
  id: string;
  label: string;
  value: string;
  category?: string;
}

interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  logo?: React.ReactNode;
  actionSlot?: React.ReactNode;
  placeholder?: string;
  LinkComponent?: React.ElementType;
  navLinks?: NavLink[];
  onSignIn?: () => void;
  className?: string;
  searchResults?: SearchResult[];
  onSearchChange?: (value: string) => void;
  onResultSelect?: (result: SearchResult) => void;
  emptyResultMessage?: string;
}

export function Navbar({
  logo = (
    <span className="font-bold text-xl uppercase tracking-tight">Brand</span>
  ),
  actionSlot,
  placeholder = "Search...",
  LinkComponent = "a",
  navLinks = [],
  onSignIn,
  className,
  searchResults = [],
  onSearchChange,
  onResultSelect,
  emptyResultMessage = "No results found.",
}: NavbarProps) {
  // State replaces Popover logic for better Inline Command control
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  // Migration Protocol: Handle "Click Outside" to maintain framework agnosticism
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header
      className={cn("w-full border-b bg-background relative z-40", className)}
    >
      <div className="container mx-auto grid grid-cols-[1fr_auto_1fr] h-16 items-center px-4 gap-4">
        {/* LOGO */}
        <div className="flex justify-start">
          <LinkComponent
            href="/"
            className="flex items-center shrink-0 hover:opacity-80 transition-opacity"
          >
            {logo}
          </LinkComponent>
        </div>
        {/* SEARCH */}
        <div
          ref={searchContainerRef}
          className="relative w-full min-w-70 lg:min-w-112.5 max-w-150 flex justify-center"
        >
          <Command>
            <CommandInput
              placeholder={placeholder}
              onFocus={() => setIsSearchOpen(true)}
              onValueChange={onSearchChange}
              className="h-10 rounded-md"
            />
            {isSearchOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 w-full z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
                <CommandList className="max-h-75 overflow-y-auto p-1">
                  <CommandGroup heading="Suggestions">
                    {searchResults &&
                      searchResults.map((result) => (
                        <CommandItem
                          key={result.id}
                          onSelect={() => {
                            onResultSelect?.(result);
                            setIsSearchOpen(false);
                          }}
                          className="cursor-pointer"
                        >
                          {result.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>

                  <CommandEmpty>{emptyResultMessage}</CommandEmpty>
                </CommandList>
              </div>
            )}
          </Command>
        </div>
        {/* ACTIONS */}
        <div className="flex justify-end items-center gap-2">
          {actionSlot}

          {onSignIn && (
            <Button
              onClick={onSignIn}
              variant="default"
              className="hidden sm:flex"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* SECONDARY ROW */}
      {navLinks.length > 0 && (
        <div>
          <div className="container mx-auto flex h-11 items-center justify-center px-4">
            <nav>
              <ul className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <LinkComponent
                      href={link.href}
                      className="whitespace-nowrap transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </LinkComponent>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
