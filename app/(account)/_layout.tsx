import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { Redirect, Stack } from "expo-router";

export default function Layout() {
  const { token } = useToken();
  const { user } = useSession();

  if (token && user?.data) {
    const href =
      typeof user.data.subscriber === "number" ? "/seller/home" : "/customer/home";
    return <Redirect href={href} />;
  }

  return (
    <>
      <Stack
        initialRouteName="sign-in"
        screenOptions={{ animation: "ios", headerShown: false }}
      />
    </>
  );
}
