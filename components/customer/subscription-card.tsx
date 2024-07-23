import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { SubscriptionWithProducts } from "data/subscription.data";
import { icons } from "constants/";
import SubscribeButton from "./subscribe-button";
import { router } from "expo-router";

export default function SubscriptionCard({
  subscription,
}: {
  subscription: SubscriptionWithProducts;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.navigate(`/seller/${subscription.id}`)}
    >
      <View
        className="flex-row items-center w-full"
        style={{
          columnGap: 16,
        }}
      >
        <View className="w-[93px] h-[93px] rounded-lg bg-[#F4F4F4] items-center justify-center">
          <Image
            source={subscription.avatar}
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
              <Text className="text-xs font-pjs-regular text-[#757575]">
                {subscription.address}
              </Text>
            </View>
            <Text className="font-pjs-regular text-[10px] text-[#757575]">
              {subscription.subscriber} Subscriber
            </Text>
          </View>
          <SubscribeButton type="unsubscribe" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
