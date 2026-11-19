import type { Character } from "@/types/apiTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Favorites {
    favoritesList: Character[];
    addFavorite: (Character: Character) => void;
    removeFavorite: (id: Character['id']) => void;
    checkIsFavorite: (id: Character['id']) => boolean;
}

export const favoritesStore = create<Favorites>()(
    persist(
        (set, get) => ({
            favoritesList: [],
            addFavorite: (Character) => { set({ favoritesList: [...get().favoritesList, Character] }) },
            removeFavorite: (id) => {
                set({ favoritesList: get().favoritesList.filter((c) => c.id !== id) })
            },
            checkIsFavorite: (id) => {
                return get().favoritesList.some((c) => c.id === id);
            }
        }),
        {
            name: 'favorites-storage',
        }
    )
);