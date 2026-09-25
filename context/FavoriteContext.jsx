"use client";
import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (user) => {
    setFavorites((prevFavorites) => {
      const isExist = prevFavorites.some((fav) => fav.id === user.id);
      if (isExist) {
        return prevFavorites.filter((fav) => fav.id !== user.id);
      } else {
        return [...prevFavorites, user];
      }
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);