import Header from "@/components/header";
import UserLayout from "@/components/layout/user-layout";
import { icons } from "@/constants";
import env from "@/env";
import useGetAccountByEmail from "@/hooks/query/useGetAccountByEmail";
import useDebounceValue from "@/hooks/useDebounceValue";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import id_ID from "dayjs/locale/id";
import { Image } from "expo-image";
import { router } from "expo-router";
import { memo, useCallback, useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

function Search() {
  const [keyword, setKeyword] = useState<string>("");
  const [debounceSearch, setDebounceSearch] = useDebounceValue(keyword, 200);
  const { data, isPending, isFetching } = useGetAccountByEmail(debounceSearch);

  const handleKeywordChange = useCallback(
    (text: string) => {
      setKeyword(text);
      setDebounceSearch(text);
    },
    [setDebounceSearch]
  );

  const renderResult = useMemo(() => {
    if (isFetching) {
      return <Text className="my-1 text-center font-pjs-semibold">Loading . . .</Text>;
    }

    if (!data?.data && keyword) {
      return (
        <Text className="my-1 text-center font-pjs-semibold">
          Akun tidak dapat ditemukan
        </Text>
      );
    }

    if (data?.data) {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-[120px] w-full p-4 my-1 overflow-hidden bg-white border border-opacity-50 rounded-lg border-slate-200"
          onPress={() => {
            if (!isPending) {
              router.navigate(`/admin/account/${data?.data.email}`);
            }
          }}
        >
          <View className="flex flex-row items-center justify-center gap-3">
            <Image
              source={
                data?.data.avatar
                  ? { uri: env.EXPO_PUBLIC_API_URL + data.data.avatar }
                  : icons.user
              }
              contentFit="cover"
              placeholder={{ blurhash: data?.data.avatarBlurHash || undefined }}
              placeholderContentFit="cover"
              className="w-[70px] h-[70px] rounded-full"
            />
            <View className="flex flex-row items-center justify-between flex-1">
              <View className="flex justify-between flex-1 h-full">
                <Text
                  className="w-auto text-base font-pjs-bold"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {data?.data.name}
                </Text>
                <Text
                  className="w-auto text-xs font-pjs-medium"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  Tipe akun : {data?.data.isSeller ? "Penjual" : "Konsumen"}
                </Text>
                <Text
                  className="w-auto text-xs font-pjs-medium"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  Status : {data?.data.isActive ? "Aktif" : "Nonaktif"}
                </Text>
                <Text
                  className="w-auto text-xs font-pjs-medium"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  Dibuat :{" "}
                  {dayjs(data?.data.createdAt).locale(id_ID).format("D MMMM YYYY")}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return null;
  }, [data, isFetching, isPending, keyword]);

  return (
    <>
      <Header title="Cari Akun" />
      <UserLayout scrollViewClassname="mt-[-15px]">
        {/* Search input */}
        <View
          className="flex flex-row items-center px-[10px] py-3 bg-[#EFEFEF] rounded-lg h-12"
          style={{ columnGap: 8 }}
        >
          <Image
            source={icons.search}
            className="w-6 h-6"
            tintColor={keyword ? "#1B1717" : "#ACACAC"}
          />
          <TextInput
            placeholder="Masukkan email akun pengguna"
            placeholderTextColor="#ACACAC"
            className={cn(
              "font-pjs-regular text-sm flex-1",
              keyword ? "text-[#1B1717]" : "text-[#ACACAC]"
            )}
            style={{ includeFontPadding: false }}
            value={keyword}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={handleKeywordChange}
            keyboardType="email-address"
          />
        </View>

        <View className="w-full h-full mt-5">{renderResult}</View>
      </UserLayout>
    </>
  );
}

export default memo(Search);
