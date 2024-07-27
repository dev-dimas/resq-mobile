import { ComponentProps, ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./header";

type Props = {
  withHeader: boolean;
  children: ReactNode;
  headerProps?: ComponentProps<typeof Header>;
};

export default function NotFound({ withHeader = false, children, headerProps }: Props) {
  return (
    <>
      {withHeader && <Header withBackButton title="Not Found" {...headerProps} />}
      <SafeAreaView>
        <View>
          <Text className="text-base text-center text-red-500 font-pjs-extrabold">
            {children}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}
