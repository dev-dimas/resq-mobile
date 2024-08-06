import { LinearGradient } from "expo-linear-gradient";
import React, { ComponentProps, ReactNode } from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

type Props = {
  children: ReactNode;
  borderRadius?: number;
  isLoading: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
} & ComponentProps<typeof ShimmerPlaceholder>;

export default function Skeleton({
  children,
  borderRadius = 8,
  isLoading = true,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  ...props
}: Props) {
  return (
    <ShimmerPlaceholder
      visible={!isLoading}
      shimmerStyle={{
        borderRadius,
        width: props.width,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
      }}
      height={props.height}
    >
      {children}
    </ShimmerPlaceholder>
  );
}
