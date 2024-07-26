import { getProductById } from "@/api/product";
import { useToken } from "@/store/useToken";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Account } from "types/account.type";
import { Product } from "types/product.type";
import { Seller } from "types/sellert.type";

type TProductById = {
  product: Product & {
    seller: Pick<Seller, "latitude" | "longitude"> & {
      account: Pick<Account, "name" | "avatar">;
      subscriber: number;
    };
  } & { distance: number };
};

export default function useProductById(productId: string) {
  const { token } = useToken();

  const product: UseQueryResult<{
    message: string;
    data: TProductById;
  }> = useQuery({
    queryKey: ["product", productId, token],
    queryFn: () => getProductById(productId, token!),
    staleTime: 2000,
    enabled: !!token,
  });

  return { ...product };
}
