import CategoryList from "@/components/customer/category-list";
import NearbySales from "@/components/customer/nearby-sales";
import UserLayout from "@/components/layout/user-layout";
import { cn, getGreeting } from "@/lib/utils";
import { icons, images } from "constants/";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <UserLayout>
      <View className="w-full">
        {/* Greeting and button account menu */}
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-base font-pjs-bold"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Selamat {getGreeting()} $Name!
          </Text>
          <Link href="/account" className="border border-[#1B1717] rounded-lg p-1">
            <Image source={icons.user} contentFit="contain" className={cn("w-6 h-6")} />
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
          >
            <View className="flex flex-row items-center w-full gap-2">
              <Image
                source={icons.location}
                contentFit="contain"
                className={cn("w-6 h-6")}
              />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                className="font-pjs-bold text-base text-[#1B1717] w-[70%]"
              >
                Jalan Raya Rungkut Industri
              </Text>
            </View>
            <Image
              source={icons.chevronDown}
              contentFit="contain"
              className={cn("w-6 h-6")}
            />
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
