import { getSellerById } from "@/api/seller";
import { useToken } from "@/store/useToken";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product.type";

export default function useGetSellerById(sellerId: string) {
  const { token } = useToken();
  const seller = useQuery<{
    message: string;
    data: {
      accountId: string;
      name: string;
      avatar?: string;
      avatarBlurHash?: string;
      latitude: string;
      longitude: string;
      address?: string;
      subscriber: number;
      products: (Pick<
        Product,
        | "id"
        | "name"
        | "price"
        | "images"
        | "startTime"
        | "endTime"
        | "isDaily"
        | "isActive"
      > & {
        isOnSale: boolean;
      })[];
    };
  }>({
    queryFn: () => getSellerById(sellerId, token!),
    queryKey: ["seller", sellerId, token],
    staleTime: 2000,
    enabled: !!token,
  });

  return { ...seller };
}
