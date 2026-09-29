"use client";
import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext(undefined);

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => res.json())
      .then(setFavorites);
  }, []);

  async function addFavorite(user) {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const saved = await res.json();
      setFavorites((prev) => [...prev, saved]);
    }
  }

  async function removeFavorite(userId) {
    const res = await fetch(`/api/favorites/${userId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== userId));
    }
  }

  function isFavorite(userId) {
    return favorites.some((fav) => fav.id === userId);
  }

  const toggleFavorite = (user) => {
    if (isFavorite(user.id)) {
      removeFavorite(user.id);
    } else {
      addFavorite(user);
    }
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorites harus digunakan di dalam <FavoriteProvider>");
  }
  return context;
}
