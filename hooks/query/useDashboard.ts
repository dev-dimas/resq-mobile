import { fetchDashboard } from "@/api/auth";
import SecureStore from "@/lib/secure-store";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Product } from "@/types/product.type";
import { Complaints } from "@/types/complaint.type";
import { Account } from "@/types/account.type";
import { FetchError } from "@/api/core";

export type DashboardResponse = {
  name: string;
  email: string;
  avatar: string;
  avatarBlurHash: string;
  latitude: string;
  longitude: string;
  address: string;
  subscriber?: number;
  complaints?: (Complaints & {
    customer: {
      account: Pick<
        Account,
        "id" | "name" | "isActive" | "email" | "avatar" | "avatarBlurHash"
      >;
    };
  } & {
    seller: {
      account: Pick<
        Account,
        "id" | "name" | "isActive" | "email" | "avatar" | "avatarBlurHash"
      >;
    };
  })[];
  products: (Product & { distance: number; latitude: string; longitude: string })[];
  expoPushToken?: string;
};

export default function useDashboard() {
  const { token, setToken } = useToken();
  const { setUser } = useSession();

  const dashboard: UseQueryResult<{
    message: string;
    data: DashboardResponse;
  }> = useQuery({
    queryKey: ["dashboard", token],
    queryFn: () => fetchDashboard(token!),
    staleTime: 2000,
    enabled: !!token,
  });

  useEffect(() => {
    if (dashboard.error instanceof FetchError) {
      if (dashboard.error.res.statusCode === 401) {
        SecureStore.deleteItemAsync("token");
        setToken(null);
        setUser(undefined);
        return;
      }
    }
  }, [dashboard.error, setToken, setUser]);

  return { ...dashboard };
}
