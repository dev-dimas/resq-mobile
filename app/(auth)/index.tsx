import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/button";
import InputField from "../../components/input-field";
import { images } from "../../constants";
import { Link } from "expo-router";

export default function SignIn() {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View
          className="flex items-center flex-1 w-full h-full py-5 px-7"
          style={{
            minWidth: Dimensions.get("window").width,
          }}
        >
          <Image source={images.logo} resizeMode="contain" className="w-[180px] h-[180px]" />
          <Text className="pt-5 pb-[22px] text-2xl font-pjs-extrabold ">Masuk</Text>

          <View className="flex" style={{ rowGap: 10 }}>
            <InputField label="Email" />
            <InputField label="Kata Sandi" />
          </View>

          <Button handlePress={() => {}} containerStyles="bg-[#FF3B30] w-full mt-[22px]">
            Masuk
          </Button>

          <View className="flex w-full mt-3">
            <Text className="text-sm font-pjs-regular">
              Belum memiliki akun?. Silahkan buat{" "}
              <Link href={"/sign-up"} className="font-pjs-extrabold text-[#FF3B30] underline">
                disini
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
