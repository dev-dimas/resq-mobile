import { StatusBar } from "expo-status-bar";
import { ImageRequireSource, ImageURISource } from "react-native";
import ImageView from "react-native-image-viewing";
import CustomHeaderImageViewer from "./custom-header-image-viewer";

export default function ImageViewer({
  images,
  isVisible,
  setIsVisible,
  title,
}: {
  images: ImageURISource[] | ImageRequireSource[];
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}) {
  return (
    <>
      <StatusBar backgroundColor={isVisible ? "black" : undefined} />
      <ImageView
        images={images}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        HeaderComponent={() => (
          <CustomHeaderImageViewer
            onRequestClose={() => setIsVisible(false)}
            title={title}
          />
        )}
      />
    </>
  );
}
