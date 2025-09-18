import { Button, Input } from "@/shared/components";
import { COLORS, SPACING } from "@/shared/styles";
import { useSubmitLogin } from "@/widgets/login/api";
import type { LoginFormData } from "@/widgets/login/types";
import { WelcomeHeader } from "@/widgets/login/WelcomeHeader";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { control, handleSubmit, watch } = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { username, password } = watch();
  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const { mutate: submitLogin, isPending } = useSubmitLogin();

  const onSubmit = (data: LoginFormData) => {
    submitLogin(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WelcomeHeader />
      <View style={{ gap: 20, marginBottom: 221 }}>
        <Controller
          control={control}
          name="username"
          rules={{ required: "아이디를 입력해주세요." }}
          render={({ field: { onChange, value } }) => (
            <Input
              title="아이디"
              placeholder="아이디를 입력하세요"
              value={value}
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
            <Input
              title="비밀번호"
              placeholder="비밀번호룰 입력하세요"
              value={password}
              onChangeText={onChange}
              autoCapitalize="none"
              secureTextEntry
            />
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          size="lg"
          text="로그인"
          variant={!isFormValid || isPending ? "disabled" : "primary"}
          disabled={!isFormValid || isPending}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
    gap: 20,
  },
  buttonContainer: {
    paddingVertical: SPACING.normal,
    backgroundColor: COLORS.white,
  },
});
