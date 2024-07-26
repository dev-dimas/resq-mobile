import { useFontState } from "@/store/useFontState";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { SplashScreen } from "expo-router";
import useDashboard from "hooks/query/useDashboard";
import { ReactNode, useEffect } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const { token } = useToken();
  const { data } = useDashboard();
  const { user, setUser } = useSession();
  const { isFontsLoaded } = useFontState();

  useEffect(() => {
    if (!isFontsLoaded) return;
    if (!token) {
      SplashScreen.hideAsync();
    } else if (token && user?.data) {
      SplashScreen.hideAsync();
    }
  }, [isFontsLoaded, token, user]);

  useEffect(() => {
    setUser(data);
  }, [token, data]);

  if (!isFontsLoaded || (token && !user?.data)) {
    return null;
  }

  return <>{children}</>;
}
