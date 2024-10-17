import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { Redirect } from "expo-router";

export default function Index() {
  const { token } = useToken();
  const { user } = useSession();

  if (token && user?.data) {
    let href = "";

    if (Array.isArray(user.data.complaints)) href = "/admin/complaints";
    else if (typeof user.data.subscriber === "number") href = "/seller/home";
    else href = "/customer/home";
    return <Redirect href={href} />;
  } else return <Redirect href="/sign-in" />;
}
