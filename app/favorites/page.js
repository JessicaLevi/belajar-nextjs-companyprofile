"use client";
import { useFavorites } from "@/context/FavoriteContext";
import UserCard from "@/components/UserCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SearchX, Users } from "lucide-react";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">Favorites</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              My Favorite Users
            </h1>
            <p className="mt-4 text-muted-foreground">
              This data is collected from FavoriteContext.
            </p>
          </div>

          <Link
            href="/users"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden rounded-full sm:inline-flex items-center gap-2 shrink-0",
            )}
          >
            <Users className="h-4 w-4" />
            See Users Directory
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.length > 0 ? (
            favorites.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
              <SearchX className="size-8" />
              <p>No favorite users.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
