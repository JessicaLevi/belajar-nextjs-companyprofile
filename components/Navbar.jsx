"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { useUser } from "@/context/UserContext";

import ThemeToggle from "@/components/ThemeToggle";

import { useFavorites } from "@/context/FavoriteContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { name, submitted } = useUser();
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-4xl px-4">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-[var(--header-bg)] text-[var(--header-text)] px-4 py-2 shadow-lg shadow-black/20 backdrop-blur-xl">
        <Link href="/" className="shrink-0 text-sm font-bold tracking-tight">
          MyWebsite
        </Link>

        <div className="hidden items-center gap-1 text-sm text-[var(--muted-header-text)] sm:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors hover:text-[var(--header-text-foreground)]",
                  isActive &&
                    "bg-[var(--header-foreground)]/10 text-[var(--header-text-foreground)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-sm">
          {submitted && <span>Hi, {name} 👋</span>}

          <ThemeToggle />

          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden rounded-full sm:inline-flex",
            )}
          >
            Get in touch
          </Link>

          <Link href="/favorites" className="text-sm">
            Favorite ({favorites.length})
          </Link>
        </div>
      </nav>
    </header>
  );
}
