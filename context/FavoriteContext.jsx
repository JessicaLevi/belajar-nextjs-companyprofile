"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [pendingIds, setPendingIds] = useState([]); // user_id yang sedang diproses
  const [error, setError] = useState(null); // { userId, message }
  const inFlight = useRef(new Set()); // penjaga klik ganda (sinkron, tidak menunggu render)

  useEffect(() => {
    if (!isLoggedIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFavorites([]);
      return;
    }

    fetch("/api/favorites")
      .then((res) => (res.ok ? res.json() : []))
      .then(setFavorites)
      .catch(() => setFavorites([]));
  }, [isLoggedIn]);

  // Pola yang sama untuk add & remove: cegah klik ganda, tangani gagal, bersihkan status
  async function runAction(userId, send, onSuccess) {
    if (inFlight.current.has(userId)) return;
    inFlight.current.add(userId);
    setPendingIds((prev) => [...prev, userId]);
    setError(null);

    try {
      const res = await send();

      if (res.ok) {
        onSuccess(await res.json());
      } else {
        const data = await res.json().catch(() => ({}));
        setError({ userId, message: data.error || "Gagal memperbarui favorit" });
      }
    } catch {
      setError({ userId, message: "Tidak dapat terhubung ke server" });
    } finally {
      inFlight.current.delete(userId);
      setPendingIds((prev) => prev.filter((id) => id !== userId));
    }
  }

  function addFavorite(user) {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    return runAction(
      user.id,
      () =>
        fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id }),
        }),
      (saved) => setFavorites((prev) => [...prev, saved]),
    );
  }

  function removeFavorite(userId) {
    return runAction(
      userId,
      () => fetch(`/api/favorites/${userId}`, { method: "DELETE" }),
      () => setFavorites((prev) => prev.filter((f) => f.user_id !== userId)),
    );
  }

  function isFavorite(userId) {
    return favorites.some((f) => f.user_id === userId);
  }

  function isPending(userId) {
    return pendingIds.includes(userId);
  }

  function getError(userId) {
    return error?.userId === userId ? error.message : null;
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    isPending,
    getError,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorite harus dipakai di dalam <FavoriteProvider>");
  }
  return context;
}

export const useFavorites = useFavorite;