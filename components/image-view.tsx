import { useState } from "react";
import ImageView from "react-native-image-viewing";

export default function ImageViewer({
  images,
  isVisible,
  setIsVisible,
}: {
  images: { uri: string }[];
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <ImageView
      images={images}
      imageIndex={0}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    />
  );
}
