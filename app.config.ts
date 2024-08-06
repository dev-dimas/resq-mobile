import { ConfigContext, ExpoConfig } from "expo/config";
import "ts-node/register";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Resq Mobile",
  slug: "resq-mobile",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "resq-mobile",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.dimaslabs.resq",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    permissions: [
      "android.permission.RECORD_AUDIO",
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION",
    ],
    package: "com.dimaslabs.resq",
    googleServicesFile: "./google-services.json",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    [
      "expo-image-picker",
      {
        photosPermission:
          "Aplikasi ini memerlukan izin akses foto untuk memilih profile picture atau gambar produk.",
        cameraPermission:
          "Aplikasi ini memerlukan izin akses kamera untuk memotret profile picture atau gambar produk.",
      },
    ],
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Izinkan $(PRODUCT_NAME) untuk mengakses GPS.",
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 34,
          targetSdkVersion: 34,
          buildToolsVersion: "34.0.0",
        },
        ios: {
          deploymentTarget: "13.4",
        },
      },
    ],
    [
      "@rnmapbox/maps",
      {
        RNMapboxMapsDownloadToken: process.env.MAPBOX_SECRET,
      },
    ],
  ],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "b5f1d619-80b4-4e57-aa85-1906e24e857a",
    },
  },
  owner: "dev.dimas",
  updates: {
    url: "https://u.expo.dev/b5f1d619-80b4-4e57-aa85-1906e24e857a",
  },
});
