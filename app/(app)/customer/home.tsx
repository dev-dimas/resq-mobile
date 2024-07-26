import CategoryList from "@/components/customer/category-list";
import NearbySales from "@/components/customer/nearby-sales";
import UserLayout from "@/components/layout/user-layout";
import UserLocation from "@/components/user-location";
import { cn, getGreeting } from "@/lib/utils";
import { useSession } from "@/store/useSession";
import { icons, images } from "constants/";
import env from "env";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { user } = useSession();

  return (
    <UserLayout containerClassname="pt-5">
      <View className="w-full">
        {/* Greeting and button account menu */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-base font-pjs-bold"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Selamat {getGreeting()} {user?.data.name.replace(/ .*/, "")}!
          </Text>
          <Link
            href="/setting"
            className={cn(
              "rounded-lg",
              !user?.data.avatar && "border border-[#1B1717] p-1"
            )}
          >
            <Image
              source={
                user?.data.avatar
                  ? env.EXPO_PUBLIC_API_URL + user?.data.avatar
                  : icons.user
              }
              contentFit="contain"
              className={cn("w-8 h-8 rounded-lg")}
            />
          </Link>
        </View>

        {/* Location */}
        <View className="flex gap-2 mt-5">
          <Text className="uppercase text-[#FF3B30] font-pjs-bold text-sm">
            Lokasi kamu
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row items-center justify-between w-[82%]"
            onPress={() => router.navigate("/location")}
          >
            <UserLocation />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-[#EFEFEF] mt-6 rounded-lg"
          onPress={() => router.navigate("/search")}
        >
          <View className="px-[10px] py-3 flex flex-row gap-2">
            <Image source={icons.search} className="w-6 h-6" />
            <Text className="font-pjs-regular text-sm text-[#ACACAC]">
              Mau makan apa hari ini?
            </Text>
          </View>
        </TouchableOpacity>

        {/* Hero or banner image */}
        <View className="h-[145px] flex items-center justify-center overflow-hidden rounded-lg mt-6">
          <Image
            source={images.posterHomepage}
            contentFit="contain"
            className="object-center w-full bg-red-500 aspect-video"
          />
        </View>

        {/* Category */}
        <CategoryList />

        {/* Nearby Sales */}
        <NearbySales />
      </View>
    </UserLayout>
  );
}
