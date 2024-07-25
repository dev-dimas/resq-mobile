import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {
  name: string;
  control: Control<FieldValues>;
  defaultValue?: boolean;
} & React.ComponentProps<typeof BouncyCheckbox>;

export default function Checkbox({ control, name, defaultValue, ...props }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || false}
      render={({ field: { onChange, value } }) => (
        <BouncyCheckbox
          size={23}
          textStyle={{
            textDecorationLine: "none",
            fontFamily: "PlusJakartaSans-Bold",
            fontSize: 14,
            color: "black",
            includeFontPadding: false,
            paddingTop: 0.5,
          }}
          textContainerStyle={{
            marginLeft: 9,
          }}
          innerIconStyle={{
            borderRadius: 8,
            borderColor: value ? "#FF3B30" : "#D9D9D9",
          }}
          iconStyle={{
            borderRadius: 8,
          }}
          fillColor="#FF3B30"
          unFillColor="#EFEFEF"
          {...props}
          isChecked={value}
          onPress={onChange}
          disabled={props.disabled}
        />
      )}
    />
  );
}
