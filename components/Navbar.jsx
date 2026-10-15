"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
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

// Nama dari saat daftar (user_metadata.name); cadangannya bagian depan email
function getDisplayName(user) {
  const name = user?.user_metadata?.name?.trim();
  return (name || user?.email?.split("@")[0] || "").split(" ")[0];
}

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();
  const { favorites } = useFavorite();
  const [open, setOpen] = useState(false); // menu untuk layar kecil

  // Menu Favorite baru muncul setelah ada user yang difavoritkan
  const navLinks =
    favorites.length > 0
      ? [...links, { href: "/favorites", label: `Favorite (${favorites.length})` }]
      : links;

  function isActive(href) {
    return href === "/" ? pathname === "/" : pathname?.startsWith(href);
  }

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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 transition-colors hover:text-[var(--header-text-foreground)]",
                isActive(link.href) && "bg-[var(--header-foreground)]/10 text-[var(--header-text-foreground)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Sapaan hanya di layar lebar; di layar kecil ada di dalam menu */}
          {isLoggedIn && (
            <span
              className="hidden max-w-28 truncate text-sm text-[var(--muted-header-text)] lg:inline"
              title={user?.email}
            >
              Hi, {getDisplayName(user)}
            </span>
          )}

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

          {/* Tombol menu: hanya tampil di layar kecil */}
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full text-[var(--header-text)] transition-colors hover:bg-[var(--header-foreground)]/10 sm:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="mt-2 rounded-3xl border border-white/10 bg-[var(--header-bg)] p-2 text-[var(--muted-header-text)] shadow-lg shadow-black/20 backdrop-blur-xl sm:hidden"
        >
          {isLoggedIn && (
            <p className="truncate px-4 pt-2 pb-1 text-xs">
              Signed in as {user?.email}
            </p>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-2xl px-4 py-2.5 text-sm transition-colors hover:text-[var(--header-text-foreground)]",
                isActive(link.href) && "bg-[var(--header-foreground)]/10 text-[var(--header-text-foreground)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}