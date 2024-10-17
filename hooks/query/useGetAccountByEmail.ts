import { getAccount } from "@/api/admin";
import { useToken } from "@/store/useToken";
import { Account } from "@/types/account.type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export default function useGetAccountByEmail(email: string) {
  const { token } = useToken();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const account: UseQueryResult<{
    message: string;
    data: Account;
  }> = useQuery({
    queryKey: ["account", email, token],
    queryFn: () => getAccount(email, token!),
    enabled: !!token && emailRegex.test(email),
  });

  return { ...account };
}
