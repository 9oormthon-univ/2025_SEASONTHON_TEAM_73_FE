import { Button } from "@/shared/components";
import { useSubmitLogin } from "@/widgets/login/api";
import type { LoginFormData } from "@/widgets/login/types";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const { control, handleSubmit, watch } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { username, password } = watch();
  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const { mutate: submitLogin } = useSubmitLogin();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    submitLogin(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>임시 로그인</Text>

      <Controller
        control={control}
        name="username"
        rules={{ required: "아이디를 입력해주세요." }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="아이디"
            value={username}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: "비밀번호를 입력해주세요." }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            value={password}
            onChangeText={onChange}
            autoCapitalize="none"
            secureTextEntry
          />
        )}
      />

      <Button
        text="로그인"
        variant={isFormValid ? "primary" : "disabled"}
        disabled={!isFormValid}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

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
