import { subscribeTo, unsubscribeFrom } from "@/api/customer";
import { cn } from "@/lib/utils";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { useToken } from "@/store/useToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import Skeleton from "../skeleton";

type Props = {
  sellerId: string;
  productId?: string;
  isLoading?: boolean;
};

export default function SubscribeButton({
  sellerId,
  productId,
  isLoading = false,
}: Props) {
  const { subscription } = useSubscriptionStore();
  const { token } = useToken();
  const [isSubscribed, setIsSubscribed] = useState(
    !!subscription?.data.find((sub) => sub.accountId === sellerId)
  );
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
      await queryClient.invalidateQueries({
        queryKey: ["subscription"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
      await queryClient.invalidateQueries({ queryKey: ["seller", sellerId] });
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
      await queryClient.invalidateQueries({ queryKey: ["seller", sellerId] });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({
        queryKey: ["subscription"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
      await queryClient.invalidateQueries({ queryKey: ["seller", sellerId] });
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

  const handleSubscribe = async () => {
    if (isSubscribed) return;
    if (subscribeRequest.isPending) return;
    setIsSubscribed(true);

    await subscribeRequest.mutateAsync();
  };

  const handleUnsubscribe = async () => {
    if (!isSubscribed) return;
    if (unsubscribeRequest.isPending) return;
    setIsSubscribed(false);

    await unsubscribeRequest.mutateAsync();
  };

  useEffect(() => {
    if (sellerId !== "")
      setIsSubscribed(!!subscription?.data.find((sub) => sub.accountId === sellerId));
  }, [sellerId]);

  return (
    <Skeleton isLoading={isLoading || sellerId === ""} width={105} height={36}>
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
    </Skeleton>
  );
}
