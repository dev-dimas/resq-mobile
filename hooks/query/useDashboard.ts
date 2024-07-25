import { fetchDashboard } from "@/api/auth";
import { useToken } from "@/store/useToken";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Product } from "types/product.type";

type DashboardResponse = {
  name: string;
  email: string;
  avatar: string;
  latitude: string;
  longitude: string;
  subscriber?: number;
  products: Product[];
};

export default function useDashboard() {
  const { token } = useToken();

  const dashboard: UseQueryResult<{
    message: string;
    data: DashboardResponse;
  }> = useQuery({
    queryKey: ["dashboard", token],
    queryFn: () => fetchDashboard(token!),
    staleTime: 2000,
    enabled: !!token,
  });

  return { ...dashboard };
}
