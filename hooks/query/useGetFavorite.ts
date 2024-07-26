import { getFavoriteList } from "@/api/customer";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { useQuery } from "@tanstack/react-query";
import { Product } from "types/product.type";

export type TFavorite = (Product & {
  distance: number;
  latitude: string;
  longitude: string;
})[];

export default function useGetFavorite() {
  const { token } = useToken();
  const { user } = useSession();

  const favorite = useQuery<{
    message: string;
    data: TFavorite;
  }>({
    queryKey: ["favorite", token],
    queryFn: () => getFavoriteList(token!),
    staleTime: 2000,
    enabled: !!token && !!(typeof user?.data.subscriber !== "number"),
  });

  return { ...favorite };
}
