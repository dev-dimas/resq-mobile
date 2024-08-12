import CategoryList from "@/components/customer/category-list";
import NearbySales from "@/components/customer/nearby-sales";
import UserLayout from "@/components/layout/user-layout";
import Skeleton from "@/components/skeleton";
import UserLocation from "@/components/user-location";
import { icons, images } from "@/constants";
import env from "@/env";
import { cn, getGreeting } from "@/lib/utils";
import { useSession } from "@/store/useSession";
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
          <Skeleton isLoading={user === null}>
            <Text
              className="text-base font-pjs-bold"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              Selamat {getGreeting()} {user?.data.name.replace(/ .*/, "")}!
            </Text>
          </Skeleton>
          <Skeleton isLoading={user === null} width={42} height={42}>
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
                placeholder={{ blurhash: user?.data.avatarBlurHash || undefined }}
                placeholderContentFit={user?.data.avatarBlurHash ? "cover" : undefined}
                className={cn("w-8 h-8 rounded-lg")}
              />
            </Link>
          </Skeleton>
        </View>

        {/* Location */}
        <View className="flex gap-2 mt-5">
          <Text className="uppercase text-[#FF3B30] font-pjs-bold text-sm">
            Lokasi kamu
          </Text>
          <Skeleton isLoading={user === null} width="85%" height={24}>
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex flex-row items-center justify-between w-[82%]"
              onPress={() => router.navigate("/location")}
            >
              <UserLocation />
            </TouchableOpacity>
          </Skeleton>
        </View>

        {/* Search */}
        <Skeleton isLoading={user === null} marginTop={24} height={48}>
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
        </Skeleton>

        {/* Hero or banner image */}
        <Skeleton isLoading={user === null} height={145} marginTop={24}>
          <View className="h-[145px] flex items-center justify-center overflow-hidden rounded-lg mt-6">
            <Image
              // source={require('@/assets/images/poster-homepage.png')}
              source={images.posterHomepage}
              contentFit="contain"
              className="object-center w-full bg-red-500 aspect-video"
            />
          </View>
        </Skeleton>

        {/* Category */}
        <CategoryList />

        {/* Nearby Sales */}
        <NearbySales />
      </View>
    </UserLayout>
  );
}
