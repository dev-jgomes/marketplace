"use client";

import Link from "next/link";
import { Navbar as AgnosticNavbar } from "@marketplace/design-system";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@marketplace/design-system";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  label: string;
  value: string;
}

export function Navbar() {
  const router = useRouter();

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };
  const handleResultSelect = (result: SearchResult) => {
    router.push(`/category/${result.value}`);
  };
  return (
    <AgnosticNavbar
      logo={
        <span className="font-bold text-xl uppercase tracking-tight text-brand-main">
          Marketplace
        </span>
      }
      LinkComponent={Link}
      placeholder="Search marketplace..."
      navLinks={[
        { label: "Spring Collection", href: "/category/spring-collection" },
        { label: "Summer Celebrations", href: "/category/summer-celebrations" },
      ]}
      actionSlot={
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <ShoppingCart className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="size-5" />
          </Button>
        </div>
      }
      searchResults={[
        { id: "1", label: "Spring Collection", value: "spring-collection" },
        { id: "2", label: "Summer Celebrations", value: "summer-celebrations" },
      ]}
      onSearchChange={handleSearch}
      onResultSelect={handleResultSelect}
      onSignIn={() => console.log("Directing to Auth...")}
    />
  );
}
