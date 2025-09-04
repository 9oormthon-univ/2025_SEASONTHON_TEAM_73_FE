import { Button } from "@/shared/components";
import { useAuthStore } from "@/shared/store";
import React from "react";
import { View } from "react-native";

export default function LoginScreen() {
  const { logout } = useAuthStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button text="로그아웃" onPress={() => logout()} />
    </View>
  );
}
