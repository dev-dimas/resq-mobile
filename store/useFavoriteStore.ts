import { TFavorite } from "hooks/query/useGetFavorite";
import { create } from "zustand";

type TFavoriteStore = {
  message: string;
  data: TFavorite;
};

interface FavoriteStore {
  favorite: TFavoriteStore | null | undefined;
  setFavorite: (favorite: TFavoriteStore | undefined) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorite: null,
  setFavorite: (favorite: TFavoriteStore | undefined) => set({ favorite }),
}));
