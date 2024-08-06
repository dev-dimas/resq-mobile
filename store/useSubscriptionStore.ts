import { TSubscription } from "@/hooks/query/useGetSubscription";
import { create } from "zustand";

type TSubscriptionStore = {
  message: string;
  data: TSubscription;
};

interface SubscriptionStore {
  subscription: TSubscriptionStore | null | undefined;
  setSubscription: (subscription: TSubscriptionStore | undefined) => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  subscription: null,
  setSubscription: (subscription: TSubscriptionStore | undefined) =>
    set({ subscription }),
}));
