import api from "@/shared/api/axios";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { username, password });
      if (res.data.success) {
        const { accessToken, refreshToken } = res.data.data;

        // SecureStore에 저장
        await SecureStore.setItemAsync("accessToken", accessToken);
        await SecureStore.setItemAsync("refreshToken", refreshToken);

        Alert.alert("로그인 성공", `환영합니다, ${res.data.data.username}님!`);
      } else {
        Alert.alert("로그인 실패", res.data.message);
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("에러", "로그인 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>임시 로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
});
