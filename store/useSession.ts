import { DashboardResponse } from "hooks/query/useDashboard";
import { create } from "zustand";

type TUser = {
  message: string;
  data: DashboardResponse;
};

interface SessionStore {
  user: TUser | null | undefined;
  setUser: (user: TUser | undefined) => void;
}

export const useSession = create<SessionStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
