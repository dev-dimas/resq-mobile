import SecureStore from "@/lib/secure-store";
import { create } from "zustand";

interface TokenStore {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useToken = create<TokenStore>((set) => ({
  token: SecureStore.getItem("token"),
  setToken: (token) => set({ token }),
}));
