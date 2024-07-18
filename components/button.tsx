import { ReactNode } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { cn } from "../lib/utils";
import { ClassValue } from "clsx";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  children: ReactNode;
  loadingColor?: string;
  containerStyles?: ClassValue;
  textStyles?: ClassValue;
  isLoading?: boolean;
  onSubmit?: SubmitHandler<T>;
} & TouchableOpacityProps;

export default function Button<T extends FieldValues>({
  children,
  loadingColor = "#fff",
  containerStyles,
  textStyles,
  isLoading,
  onSubmit,
  ...props
}: Props<T>) {
  const { handleSubmit } = useFormContext<T>();

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.75}
      className={cn(
        "rounded-lg min-h-[47px] flex flex-row justify-center items-center",
        containerStyles,
        isLoading && "opacity-60"
      )}
      onPress={onSubmit ? handleSubmit(onSubmit) : props.onPress}
      disabled={isLoading}
    >
      <View className="relative">
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color={loadingColor}
            size="small"
            className="absolute z-10 -left-8"
          />
        )}
        <Text className={cn("font-pjs-bold text-sm text-white", textStyles)}>
          {isLoading ? "Loading..." : children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
