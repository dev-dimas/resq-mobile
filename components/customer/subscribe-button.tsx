import { subscribeTo, unsubscribeFrom } from "@/api/customer";
import { cn } from "@/lib/utils";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useToken } from "@/store/useToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

type Props = {
  sellerId: string;
  productId?: string;
};

export default function SubscribeButton({ sellerId, productId }: Props) {
  const { subscription } = useSubscriptionStore();
  const { token } = useToken();
  const queryClient = useQueryClient();
  const subscribeRequest = useMutation({
    mutationFn: () => subscribeTo(sellerId, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["subscription"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
      await queryClient.invalidateQueries({ queryKey: ["seller", sellerId] });
    },
    onError: async (error) => {
      if (error.message === "Conflict") {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Penjual sudah ada di daftar subscription kamu!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Terjadi kesalahan. Coba lagi!",
        });
      }
    },
  });
  const unsubscribeRequest = useMutation({
    mutationFn: () => unsubscribeFrom(sellerId, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["subscription"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
    },
    onError: async (error) => {
      if (error.message === "Conflict") {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Penjual tidak ada di daftar subscription kamu!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Terjadi kesalahan. Coba lagi!",
        });
      }
    },
  });

  const isSubscribed = subscription?.data.find((sub) => sub.accountId === sellerId);

  const handleSubscribe = async () => {
    if (isSubscribed) return;
    if (subscribeRequest.isPending) return;

    await subscribeRequest.mutateAsync();
  };

  const handleUnsubscribe = async () => {
    if (!isSubscribed) return;
    if (unsubscribeRequest.isPending) return;

    await unsubscribeRequest.mutateAsync();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(
        "flex justify-center items-center rounded-lg w-[105px] py-2 border",
        isSubscribed
          ? "bg-[#FF3B30]/20 border-[#FF3B30]/20"
          : "bg-[#FFFFFF] border-[#FF3B30]"
      )}
      onPress={isSubscribed ? handleUnsubscribe : handleSubscribe}
      disabled={subscribeRequest.isPending || unsubscribeRequest.isPending}
    >
      <Text className="font-pjs-bold text-sm text-[#FF3B30]">
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </Text>
    </TouchableOpacity>
  );
}
