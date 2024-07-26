import { fetchDashboard } from "@/api/auth";
import SecureStore from "@/lib/secure-store";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Product } from "types/product.type";

export type DashboardResponse = {
  name: string;
  email: string;
  avatar: string;
  latitude: string;
  longitude: string;
  subscriber?: number;
  products: Product[];
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
    if (dashboard.failureReason?.message === "Unauthorized") {
      SecureStore.deleteItemAsync("token");
      setToken(null);
      setUser(undefined);
      return;
    }
  }, [dashboard.failureReason]);

  return { ...dashboard };
}
