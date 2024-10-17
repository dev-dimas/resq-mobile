import { cn } from "@/lib/utils";
import React, { memo } from "react";
import { Text } from "react-native";

function SellerAddress({
  address,
  className,
}: {
  address: string | undefined;
  className?: string;
}) {
  return (
    <Text
      className={cn("text-xs font-pjs-regular w-[90%]", className)}
      ellipsizeMode="tail"
      numberOfLines={1}
    >
      {address || "-----"}
    </Text>
  );
}

export default memo(SellerAddress);
