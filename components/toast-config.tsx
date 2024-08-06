import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => {
    if (props.text1 === "" || props.text1 === undefined || props.text1 === null) {
      return <></>;
    } else {
      return (
        <BaseToast
          {...props}
          text1Style={{
            fontFamily: "PlusJakartaSans-Bold",
            fontSize: 16,
          }}
          text2Style={{
            fontFamily: "PlusJakartaSans-Regular",
            fontSize: 14,
            color: "black",
          }}
          style={{
            borderLeftColor: "#22c55e",
            backgroundColor: "#dcfce7",
          }}
        />
      );
    }
  },
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16,
      }}
      text2Style={{
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 14,
        color: "black",
      }}
      style={{
        borderLeftColor: "#ef4444",
        backgroundColor: "#fee2e2",
      }}
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text1Style={{
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16,
      }}
      text2Style={{
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 14,
        color: "black",
      }}
      style={{
        borderLeftColor: "#3b82f6",
        backgroundColor: "#dbeafe",
      }}
    />
  ),
};
