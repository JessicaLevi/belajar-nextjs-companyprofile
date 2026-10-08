"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useFavorite } from "@/context/FavoriteContext";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const { favorites } = useFavorite();

  // Menu Favorite baru muncul setelah ada user yang difavoritkan
  const navLinks =
    favorites.length > 0
      ? [...links, { href: "/favorites", label: `Favorite (${favorites.length})` }]
      : links;

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-4xl px-4">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-[var(--header-bg)] text-[var(--header-text)] px-4 py-2 shadow-lg shadow-black/20 backdrop-blur-xl">
        <Link
          href="/"
          className="shrink-0 text-sm font-bold tracking-tight"
        >
          MyWebsite
        </Link>

        <div className="hidden items-center gap-1 text-sm text-[var(--muted-header-text)] sm:flex">
          {navLinks.map((link) => {
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
                  isActive && "bg-[var(--header-foreground)]/10 text-[var(--header-text-foreground)]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Tombol Login / Logout */}
          {isLoggedIn ? (
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="cursor-pointer rounded-full border border-[var(--header-text)]/30 px-3 py-1.5 text-sm text-[var(--header-text)] transition-colors hover:bg-[var(--header-foreground)]/10 hover:text-[var(--header-text-foreground)]"
              >
                Logout
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-[var(--header-text)]/30 px-3 py-1.5 text-sm text-[var(--header-text)] transition-colors hover:bg-[var(--header-foreground)]/10 hover:text-[var(--header-text-foreground)]"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}