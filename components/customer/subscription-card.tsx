import { icons } from "constants/";
import env from "env";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Account } from "types/account.type";
import { Seller } from "types/sellert.type";
import SellerAddress from "./seller-address";
import SubscribeButton from "./subscribe-button";

type Props = {
  subscription: Pick<Seller, "accountId" | "latitude" | "longitude"> &
    Pick<Account, "name" | "avatar"> & { subscriber: number };
};

export default function SubscriptionCard({ subscription }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.navigate(`/seller/${subscription.accountId}`)}
    >
      <View
        className="flex-row items-center w-full"
        style={{
          columnGap: 16,
        }}
      >
        <View className="w-[93px] h-[93px] rounded-lg bg-[#F4F4F4] items-center justify-center">
          <Image
            source={
              subscription.avatar
                ? env.EXPO_PUBLIC_API_URL + subscription.avatar
                : icons.user
            }
            className=" w-[73px] aspect-square rounded-full"
            contentFit="cover"
          />
        </View>
        <View
          className="flex justify-between flex-1"
          style={{
            rowGap: 5,
          }}
        >
          <Text
            className="font-pjs-bold text-lg text-[#1B1717] -mt-1"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {subscription.name}
          </Text>
          <View>
            <View className="flex-row items-center gap-[3px]">
              <Image
                source={icons.location}
                className="h-3 aspect-square"
                tintColor="#757575"
              />
              <SellerAddress
                className="text-[#757575]"
                latitude={subscription.latitude!}
                longitude={subscription.longitude!}
              />
            </View>
            <Text className="font-pjs-regular text-[10px] text-[#757575]">
              {subscription.subscriber} Subscriber
            </Text>
          </View>
          <SubscribeButton sellerId={subscription.accountId} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
