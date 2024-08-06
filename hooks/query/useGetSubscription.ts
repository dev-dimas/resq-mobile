import { getSubscriptionList } from "@/api/customer";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { useQuery } from "@tanstack/react-query";
import { Account } from "@/types/account.type";
import { Seller } from "@/types/sellert.type";

export type TSubscription = (Pick<
  Seller,
  "accountId" | "latitude" | "longitude" | "address"
> &
  Pick<Account, "name" | "avatar"> & { subscriber: number })[];

export default function useGetSubscription() {
  const { token } = useToken();
  const { user } = useSession();

  const subscription = useQuery<{
    message: string;
    data: TSubscription;
  }>({
    queryKey: ["subscription", token],
    queryFn: () => getSubscriptionList(token!),
    staleTime: 2000,
    enabled: !!user && typeof user?.data.subscriber === "undefined",
  });

  return { ...subscription };
}
