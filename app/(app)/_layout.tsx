import { setNotificationToken, updateLocation } from "@/api/account";
import { toastConfig } from "@/components/toast-config";
import { useNotificationObserver } from "@/hooks/useNotificationObserver";
import { registerForPushNotificationsAsync } from "@/lib/register-notification";
import { getAddress } from "@/lib/utils";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { Redirect, Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function AppLayout() {
  useNotificationObserver();
  const [_expoPushToken, setExpoPushToken] = useState<string>();
  const [_channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [_notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const { token } = useToken();
  const { user } = useSession();
  const queryClient = useQueryClient();
  const updateNotification = useMutation({
    mutationFn: (pushToken: string) => setNotificationToken({ token: pushToken }, token!),
  });
  const updateLocationRequest = useMutation({
    mutationFn: (data: { latitude: number; longitude: number; address: string }) =>
      updateLocation(data, token!),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      if (!token) return;
      if (token === user?.data.expoPushToken) return;

      await updateNotification.mutateAsync(token).then(() => {
        setExpoPushToken(token);
      });
    });

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      () => {}
    );

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (!token || !user) return;

      if (user?.data.latitude && user?.data.longitude && user.data.address) return;

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: 4,
      });

      await Location.reverseGeocodeAsync({
        latitude: parseFloat(`${currentLocation.coords.latitude}`),
        longitude: parseFloat(`${currentLocation.coords.longitude}`),
      }).then(async (res) => {
        const geoLocation = res[0];
        if (geoLocation && geoLocation.formattedAddress) {
          await updateLocationRequest.mutateAsync({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            address: getAddress(geoLocation.formattedAddress!),
          });
          await queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        }
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  if (!token && !user?.data) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false, animation: "ios" }} />
      <Toast autoHide position="top" visibilityTime={3000} config={toastConfig} />
    </>
  );
}
