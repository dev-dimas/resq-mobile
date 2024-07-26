import { create } from "zustand";

interface FontStateStore {
  isFontsLoaded: boolean | undefined;
  setIsFontsLoaded: (isFontsLoaded: boolean) => void;
}

export const useFontState = create<FontStateStore>((set) => ({
  isFontsLoaded: undefined,
  setIsFontsLoaded: (isFontsLoaded) => set({ isFontsLoaded }),
}));
