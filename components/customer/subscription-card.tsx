import { icons } from "@/constants/";
import env from "@/env";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Account } from "@/types/account.type";
import { Seller } from "@/types/sellert.type";
import SellerAddress from "./seller-address";
import SubscribeButton from "./subscribe-button";
import Skeleton from "../skeleton";

type Props = {
  subscription: Pick<Seller, "accountId" | "latitude" | "longitude" | "address"> &
    Pick<Account, "name" | "avatar"> & { subscriber: number };
  isSkeleton?: boolean;
};

export default function SubscriptionCard({ subscription, isSkeleton = false }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={
        !isSkeleton
          ? () => router.navigate(`/seller/${subscription.accountId}`)
          : undefined
      }
    >
      <View
        className="flex-row items-center w-full"
        style={{
          columnGap: 16,
        }}
      >
        <Skeleton isLoading={isSkeleton} width={93} height={93}>
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
        </Skeleton>

        <View
          className="flex justify-between flex-1"
          style={{
            rowGap: 5,
          }}
        >
          <Skeleton isLoading={isSkeleton} height={24}>
            <Text
              className="font-pjs-bold text-lg text-[#1B1717] -mt-1"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {subscription.name}
            </Text>
          </Skeleton>
          <View>
            <Skeleton isLoading={isSkeleton} height={12}>
              <View className="flex-row items-center gap-[3px]">
                <Image
                  source={icons.location}
                  className="h-3 aspect-square"
                  tintColor="#757575"
                />
                <SellerAddress
                  className="text-[#757575]"
                  address={subscription.address}
                />
              </View>
            </Skeleton>
            <Skeleton isLoading={isSkeleton} height={11} width={60} marginTop={3}>
              <Text className="font-pjs-regular text-[10px] text-[#757575]">
                {subscription.subscriber} Subscriber
              </Text>
            </Skeleton>
          </View>
          <SubscribeButton sellerId={subscription.accountId} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
