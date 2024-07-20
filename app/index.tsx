import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex gap-y-2">
      <Link href={"/(auth)/sign-in"} className="text-lg font-semibold">
        Sign-In
      </Link>
      <Link href={"/(auth)/sign-in"} className="text-lg font-semibold">
        Sign-Up
      </Link>
      <Link href={"/customer/home"} className="text-lg font-semibold">
        Customer Homepage
      </Link>
      <Link href={"/customer/favorite"} className="text-lg font-semibold">
        Customer Favorite
      </Link>
      <Link href={"/customer/subscription"} className="text-lg font-semibold">
        Customer Subscription
      </Link>
      <Link href={"/seller/home"} className="text-lg font-semibold">
        Seller Homepage
      </Link>
      <Link href={"/category/not-found"} className="text-lg font-semibold">
        Category Not Found
      </Link>
      <Link href={"/product/nearby"} className="text-lg font-semibold">
        Nearby
      </Link>
      <Link href={"/product/1"} className="text-lg font-semibold">
        Product ID : 1
      </Link>
    </SafeAreaView>
  );
}
