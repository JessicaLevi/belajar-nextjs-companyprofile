"use client";

import { Heart } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useFavorite } from "@/context/FavoriteContext";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorite();
  const favorited = isFavorite(user.id);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="relative overflow-hidden group border border-white/10 bg-foreground/[0.03] transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/20">
      {favorited && (
        <div
          className="absolute top-3 right-3 z-10 text-primary text-xl font-bold"
          title="My Favorite"
        >
          <Heart className="size-5 fill-primary text-primary" />
        </div>
      )}

      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 text-sm font-semibold">
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

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`https://jsonplaceholder.typicode.com/users/${user.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), "w-full rounded-full sm:w-auto sm:flex-1")}
          >
            View Profile
          </a>

          <Button
            variant={favorited ? "secondary" : "outline"}
            className="w-full rounded-full sm:w-auto sm:flex-1"
            aria-pressed={favorited}
            onClick={() =>
              favorited ? removeFavorite(user.id) : addFavorite(user)
            }
          >
            <Heart className={cn("mr-1 size-4", favorited ? "fill-primary text-primary" : "")} />
            {favorited ? "Remove from Favorite" : "Add to Favorite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}