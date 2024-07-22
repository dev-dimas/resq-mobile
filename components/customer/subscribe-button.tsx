import { cn } from "@/lib/utils";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function SubscribeButton({
  type = "subscribe",
}: {
  type?: "subscribe" | "unsubscribe";
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(
        "flex justify-center items-center rounded-lg w-[105px] py-2 border",
        type === "subscribe"
          ? "bg-[#FFFFFF] border-[#FF3B30]"
          : "bg-[#FF3B30]/20 border-[#FF3B30]/20"
      )}
    >
      <Text className="font-pjs-bold text-sm text-[#FF3B30]">
        {type === "subscribe" ? "Subscribe" : "Unsubscribe"}
      </Text>
    </TouchableOpacity>
  );
}
