import { logout } from "@/api/auth";
import UserLayout from "@/components/layout/user-layout";
import Modal from "@/components/modal";
import Skeleton from "@/components/skeleton";
import SecureStore from "@/lib/secure-store";
import { cn, getGreeting } from "@/lib/utils";
import { useSession } from "@/store/useSession";
import { useToken } from "@/store/useToken";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { memo, useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

function Complaints() {
  const { user, setUser } = useSession();
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState<boolean>(false);
  const [filterComplaint, setFilterComplaint] = useState<"PENDING" | "SOLVED">("PENDING");
  const { token, setToken } = useToken();
  const queryClient = useQueryClient();

  const logoutRequest = useMutation({
    mutationFn: () => logout(token!),
    onSuccess: async () => {
      setUser(undefined);
      await SecureStore.deleteItemAsync("token");
      queryClient.clear();

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Berhasil logout!",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal logout. Coba lagi!",
      });
    },
  });

  const handleLogout = useCallback(async () => {
    await logoutRequest.mutateAsync().then(() => {
      setToken(null);
    });
    setIsModalLogoutOpen(false);
  }, [logoutRequest, setToken]);

  const pendingComplaints = useMemo(
    () =>
      user?.data.complaints?.filter((complaint) => complaint.status === "PENDING") || [],
    [user?.data.complaints]
  );

  const solvedComplaints = useMemo(
    () =>
      user?.data.complaints?.filter((complaint) => complaint.status === "SOLVED") || [],
    [user?.data.complaints]
  );

  const handleFilterChange = useCallback((value: "PENDING" | "SOLVED") => {
    setFilterComplaint(value);
  }, []);

  const filteredComplaints = useMemo(
    () => (filterComplaint === "PENDING" ? pendingComplaints : solvedComplaints),
    [filterComplaint, pendingComplaints, solvedComplaints]
  );

  return (
    <UserLayout>
      <View className="flex w-full mt-4">
        <View className="flex flex-row items-center justify-between">
          <Skeleton isLoading={user === null}>
            <Text
              className="text-base font-pjs-bold"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              Selamat {getGreeting()} {user?.data.name.replace(/ .*/, "")}!
            </Text>
          </Skeleton>
          <Skeleton isLoading={user === null} width={42} height={42}>
            <TouchableOpacity
              activeOpacity={0.7}
              className="p-1 rounded-lg"
              onPress={() => setIsModalLogoutOpen(true)}
            >
              <MaterialIcons name="logout" size={28} color="#FF3B30" />
            </TouchableOpacity>
          </Skeleton>
        </View>
        <Text className="text-xs font-pjs-semibold">
          Laporan Pending : {pendingComplaints.length}
        </Text>
      </View>
      <Modal
        isVisible={isModalLogoutOpen}
        onClose={() => setIsModalLogoutOpen(false)}
        onConfirm={handleLogout}
        title="Keluar"
        description="Apakah anda yakin ingin keluar?"
        titleConfirm="Keluar"
        isLoading={logoutRequest.isPending}
      />
      <View className="flex w-full mt-10" style={{ rowGap: 12 }}>
        <View className="flex-row items-end justify-between">
          <Text className="text-base font-pjs-bold">Daftar Laporan</Text>
          <View className="flex w-[140px]">
            <Text className="ml-2 text-xs font-pjs-bold">Filter Status :</Text>
            <View className="flex flex-row items-center w-full h-10 overflow-hidden rounded-lg">
              <Picker
                mode="dropdown"
                selectedValue={filterComplaint}
                onValueChange={handleFilterChange}
                style={{
                  flex: 1,
                  maxWidth: 140,
                  backgroundColor: "#EFEFEF",
                  fontSize: 12,
                  color: "black",
                  borderRadius: 10,
                }}
              >
                <Picker.Item label="Pending" value="PENDING" />
                <Picker.Item label="Selesai" value="SOLVED" />
              </Picker>
            </View>
          </View>
        </View>
        <FlashList
          data={filteredComplaints}
          estimatedItemSize={129}
          estimatedListSize={{ width: 355, height: 905 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              className={cn(
                "flex-row w-full p-4 my-1 overflow-hidden border border-opacity-50 rounded-lg",
                filterComplaint === "PENDING"
                  ? "border-[#FDBF43] bg-[#FDBF43]/20"
                  : "border-[#49CB5C] bg-[#49CB5C]/20"
              )}
              style={{ columnGap: 6 }}
              onPress={() => router.navigate(`/admin/complaints/${item.id}`)}
            >
              <View className="flex">
                <Text className="text-xs font-pjs-medium">Pelapor</Text>
                <Text className="text-xs font-pjs-medium">Target</Text>
                <Text className="text-xs font-pjs-medium">Deskripsi</Text>
              </View>
              <View className="flex">
                <Text className="text-xs font-pjs-medium">:</Text>
                <Text className="text-xs font-pjs-medium">:</Text>
                <Text className="text-xs font-pjs-medium">:</Text>
              </View>
              <View className="flex flex-1">
                <Text
                  className="text-xs font-pjs-medium"
                  lineBreakMode="tail"
                  numberOfLines={2}
                >
                  {item.customer.account.name}
                </Text>
                <Text
                  className="text-xs font-pjs-medium"
                  lineBreakMode="tail"
                  numberOfLines={2}
                >
                  {item.seller.account.name}
                </Text>
                <Text
                  className="text-xs font-pjs-medium"
                  lineBreakMode="tail"
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text className="text-center font-pjs-regular">
              {filterComplaint === "PENDING"
                ? "Yeay, tidak ada laporan pending"
                : "Belum ada laporan yang diselesaikan"}
            </Text>
          }
        />
      </View>
    </UserLayout>
  );
}

export default memo(Complaints);
