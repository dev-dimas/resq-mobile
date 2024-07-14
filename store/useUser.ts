import { create } from "zustand";

interface UserStore {
  user: Record<string, any> | undefined | null;
  setUser: (_user: Record<string, any> | undefined | null) => void;
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
