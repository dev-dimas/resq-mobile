import { useFavoriteStore } from "@/store/useFavoriteStore";
import { useFontState } from "@/store/useFontState";
import { useSession } from "@/store/useSession";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useToken } from "@/store/useToken";
import { SplashScreen } from "expo-router";
import useDashboard from "@/hooks/query/useDashboard";
import useGetFavorite from "@/hooks/query/useGetFavorite";
import useGetSubscription from "@/hooks/query/useGetSubscription";
import { ReactNode, useEffect } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const { token } = useToken();
  const { data } = useDashboard();
  const { data: favoriteData } = useGetFavorite();
  const { data: subscriptionData } = useGetSubscription();
  const { user, setUser } = useSession();
  const { setFavorite } = useFavoriteStore();
  const { setSubscription } = useSubscriptionStore();
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
  }, [token, data, setUser]);

  useEffect(() => {
    setFavorite(favoriteData);
  }, [favoriteData, setFavorite]);

  useEffect(() => {
    setSubscription(subscriptionData);
  }, [subscriptionData, setSubscription]);

  if (!isFontsLoaded || (token && !user?.data)) {
    return null;
  }

  return <>{children}</>;
}
