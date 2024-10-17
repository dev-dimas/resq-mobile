import { cn } from "@/lib/utils";
import { Text } from "react-native";
import { View } from "react-native";

export default function OnsaleStatus({
  isOnsale,
  isCustomerScreen = false,
}: {
  isOnsale: boolean;
  isCustomerScreen?: boolean;
}) {
  const status = {
    true: isCustomerScreen ? "Tersedia" : "Sedang dijual",
    false: isCustomerScreen ? "Tidak Tersedia" : "Tidak dijual",
  };

  return (
    <View className={cn("flex-row items-center w-fit")} style={{ columnGap: 4 }}>
      <View
        className={cn("w-2 h-2 rounded-full", isOnsale ? "bg-[#49CB5C]" : "bg-[#FF3B30]")}
      />
      <Text
        className={cn(
          "text-xs font-pjs-semibold",
          isOnsale ? "text-[#49CB5C]" : "text-[#FF3B30]"
        )}
      >
        {isOnsale ? status.true : status.false}
      </Text>
    </View>
  );
}
