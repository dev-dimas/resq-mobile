import { FetchError } from "@/api/core";
import { sendComplaint } from "@/api/customer";
import { cn } from "@/lib/utils";
import { createComplaintSchema } from "@/schemas/form/complaint";
import { useToken } from "@/store/useToken";
import AntDesign from "@expo/vector-icons/AntDesign";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memo, useState } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import InputField from "../input-field";
import Modal from "../modal";
import Skeleton from "../skeleton";

function CreateComplaintButton({
  sellerId,
  isComplaintExist,
  isLoading,
}: {
  sellerId: string;
  isComplaintExist: boolean;
  isLoading: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { token } = useToken();
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(createComplaintSchema),
  });
  const sendComplaintRequest = useMutation({
    mutationFn: (data: { sellerId: string; description: string }) =>
      sendComplaint(data.sellerId, data.description, token!),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["seller", sellerId, token] });
      setIsModalOpen(false);
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Laporan terkirim",
      });
    },
    onError: (error: FetchError) => {
      if (error.res.statusCode === 409) {
        setIsModalOpen(false);
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Kamu sudah melaporkan penjual ini!",
        });
        return;
      }
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Terjadi kesalahan. Coba lagi!",
      });
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await sendComplaintRequest.mutateAsync({ sellerId, description: data.description });
  };

  return (
    <View className="flex items-end w-full px-6">
      <Skeleton isLoading={isLoading} width={112} height={37}>
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center px-3 py-2 rounded-lg bg-slate-300/80"
          style={{ columnGap: 5 }}
          onPress={() => setIsModalOpen(true)}
          disabled={isComplaintExist}
        >
          <AntDesign
            name="warning"
            size={18}
            color={isComplaintExist ? "#757575" : "black"}
          />
          <Text className={cn("font-pjs-medium", isComplaintExist && "text-[#757575]")}>
            {isComplaintExist ? "Sudah dilaporkan" : "Laporkan"}
          </Text>
        </TouchableOpacity>
      </Skeleton>
      <Modal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Laporkan Penjual"
        titleConfirm="Laporkan"
        isLoading={sendComplaintRequest.isPending}
        onConfirm={() => {
          handleSubmit(onSubmit)();
        }}
      >
        <FormProvider {...form}>
          <InputField
            name="description"
            control={control}
            // label="Deskripsi"
            placeholder={`Apa yang ingin anda laporkan terkait penjual ini?`}
            multiline
            numberOfLines={4}
            editable={!sendComplaintRequest.isPending}
          />
        </FormProvider>
      </Modal>
    </View>
  );
}

export default memo(CreateComplaintButton);
