import { useToken } from "@/store/useToken";
import { SplashScreen, router } from "expo-router";
import useDashboard from "hooks/query/useDashboard";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  fontsLoaded: boolean;
  fontsError: Error | null;
};

export default function AccountProvider({ children, fontsLoaded, fontsError }: Props) {
  const { token } = useToken();
  const { data } = useDashboard();

  useEffect(() => {
    if (fontsError) throw fontsError;

    if (fontsLoaded && ((token && data?.data) || (!token && !data))) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError, token, data]);

  if ((!fontsLoaded && !fontsError) || (token && !data)) {
    return null;
  }

  return <>{children}</>;
}
