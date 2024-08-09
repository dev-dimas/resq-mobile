import { getFavoriteList } from "@/api/customer";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export type TFavorite = (Product & {
  distance: number;
  latitude: string;
  longitude: string;
})[];

export default function useGetFavorite() {
  const { token } = useToken();
  const { user } = useSession();
  const isCustomer = (!!user?.data?.subscriber && !user.data.isAdmin) || false;

  const favorite = useQuery<{
    message: string;
    data: TFavorite;
  }>({
    queryKey: ["favorite", token],
    queryFn: () => getFavoriteList(token!),
    staleTime: 2000,
    enabled: !!user && isCustomer,
  });

  return { ...favorite };
}
