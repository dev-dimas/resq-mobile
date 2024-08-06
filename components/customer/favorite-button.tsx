import { addToFavorite, removeFromFavorite } from "@/api/customer";
import { cn } from "@/lib/utils";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { useToken } from "@/store/useToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { icons } from "@/constants";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";

type Props = {
  productId: string;
  buttonClassname?: string;
  imageClassname?: string;
};

export default function FavoriteButton({
  productId,
  buttonClassname,
  imageClassname,
}: Props) {
  const { favorite } = useFavoriteStore();
  const [isFavorite, setIsFavorite] = useState(
    !!favorite?.data.find((product) => product.id === productId)
  );
  const { token } = useToken();
  const queryClient = useQueryClient();
  const addFavoriteRequest = useMutation({
    mutationFn: () => addToFavorite(productId, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["favorite"] });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey: ["favorite"] });
      if (error.message === "Conflict") {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Produk sudah ada di daftar favorit!",
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
  const removeFavoriteRequest = useMutation({
    mutationFn: () => removeFromFavorite(productId, token!),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["favorite"] });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey: ["favorite"] });
      if (error.message === "Conflict") {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Produk tidak ada di daftar favorit!",
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

  const handleAddToFavorite = async () => {
    if (isFavorite) return;
    if (addFavoriteRequest.isPending) return;
    setIsFavorite(true);
    await addFavoriteRequest.mutateAsync();
  };

  const handleRemoveFromFavorite = async () => {
    if (!isFavorite) return;
    if (removeFavoriteRequest.isPending) return;
    setIsFavorite(false);
    await removeFavoriteRequest.mutateAsync();
  };

  useEffect(() => {
    if (productId !== "")
      setIsFavorite(!!favorite?.data.find((product) => product.id === productId));
  }, [productId]);

  if (productId === "") return null;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(buttonClassname)}
      onPress={isFavorite ? handleRemoveFromFavorite : handleAddToFavorite}
      disabled={addFavoriteRequest.isPending || removeFavoriteRequest.isPending}
    >
      <Image
        source={isFavorite ? icons.heartFill : icons.heartOutline}
        contentFit="contain"
        className={cn(imageClassname)}
        tintColor={isFavorite ? "#FF3B30" : "black"}
      />
    </TouchableOpacity>
  );
}
