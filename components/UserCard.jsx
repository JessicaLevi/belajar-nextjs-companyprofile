"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoriteContext";

export default function UserCard({ user }) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === user.id);

  return (
    <Card className="relative overflow-hidden group border border-white/10 bg-foreground/3 transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/20">
      {isFavorite && (
        <div
          className="absolute top-3 right-3 z-10 text-primary text-xl font-bold"
          title="My Favorite"
        >
          ♥
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary/40 to-primary/10 text-sm font-semibold">
            {initials}
          </div>
          <CardTitle>{user.name}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{user.email}</p>

        <p className="mt-1 text-sm text-muted-foreground">
          {user.company.name}
        </p>

        <div className="flex mt-4 flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <Button className="mt-4 w-full rounded-full sm:w-auto sm:flex-1">
            View Profile
          </Button>
          <Button
            onClick={() => toggleFavorite(user)}
            className={`btn-favorite mt-4 rounded-full border transition-colors duration-200
           ${
             isFavorite
               ? "bg-primary text-primary-foreground border-primary"
               : "bg-transparent border-border text-foreground hover:bg-accent hover:text-accent-foreground"
           }`}
          >
            {isFavorite ? "♥ Remove from Favorite" : "♡ Add to Favorite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
