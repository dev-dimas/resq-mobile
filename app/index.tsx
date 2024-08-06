import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { Redirect } from "expo-router";

export default function Index() {
  const { token } = useToken();
  const { user } = useSession();

  if (token && user?.data) {
    const href =
      typeof user.data.subscriber === "number" ? "/seller/home" : "/customer/home";
    return <Redirect href={href} />;
  } else return <Redirect href="/sign-in" />;
}
