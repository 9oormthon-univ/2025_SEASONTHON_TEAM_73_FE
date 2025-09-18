import api from "@/shared/api/axios";
import { Button } from "@/shared/components";
import { InputField } from "@/shared/components/InputField/InputField";
import { RadioButtonGroup } from "@/widgets/signUp/RadioButtonGroup";
import { ToggleSwitch } from "@/widgets/signUp/ToggleSwitch";
import { router } from "expo-router";
import React from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export const RegistrationForm: React.FC = () => {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    age: "",
    gender: "",
    notifications: false,
  });

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    age: "",
    gender: "",
  });

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value) error = "아이디를 입력해주세요.";
        else if (value.length < 4) error = "아이디는 4자 이상이어야 합니다.";
        break;
      case "password":
        if (!value) error = "비밀번호를 입력해주세요.";
        else if (value.length < 6) error = "비밀번호는 6자 이상이어야 합니다.";
        break;
      case "passwordConfirm":
        if (value !== form.password) error = "비밀번호가 일치하지 않습니다.";
        break;
      case "nickname":
        if (!value) error = "닉네임을 입력해주세요.";
        break;
      case "age":
        if (!value) error = "나이를 입력해주세요.";
        else if (isNaN(Number(value)) || Number(value) < 1)
          error = "올바른 나이를 입력해주세요.";
        break;
      case "gender":
        if (!value) error = "성별을 선택해주세요.";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleChange = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (typeof value === "string") {
      validateField(name, value);
    }
  };

  const handleSubmit = () => {
    const isValid = Object.entries(form)
      .filter(([key]) => key !== "notifications")
      .every(([key, value]) => validateField(key, String(value)));

    if (isValid) {
      const payload = {
        username: form.username,
        password: form.password,
        confirmPassword: form.passwordConfirm,
        nickname: form.nickname,
        age: Number(form.age),
        gender: form.gender.toUpperCase(),
        room: form.notifications,
      };

      api
        .post("/auth/signup", payload)
        .then((response) => {
          console.log("회원가입 성공:", response.data);
          router.push({
            pathname: "/sign-up/message-verify",
            params: { username: form.username ?? "" },
          });
        })
        .catch((error) => {
          console.error(
            "회원가입 실패:",
            error.response?.data || error.message
          );
          Alert.alert("이미 존재하는 계정입니다");
        });
    } else {
      console.log("유효성 오류 있음:", errors);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputField
        label="아이디"
        placeholder="아이디를 입력하세요."
        value={form.username}
        onChangeText={(text) => handleChange("username", text)}
        errorMessage={errors.username}
      />
      <InputField
        label="비밀번호"
        placeholder="비밀번호를 입력하세요."
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
        textContentType="newPassword"
        errorMessage={errors.password}
      />

      <InputField
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 입력하세요."
        value={form.passwordConfirm}
        onChangeText={(text) => handleChange("passwordConfirm", text)}
        secureTextEntry
        textContentType="newPassword"
        errorMessage={errors.passwordConfirm}
      />

      <InputField
        label="닉네임"
        placeholder="닉네임을 입력하세요."
        value={form.nickname}
        onChangeText={(text) => handleChange("nickname", text)}
        textContentType="nickname" // ✅ iOS에서 닉네임 입력 필드로 인식
        errorMessage={errors.nickname}
      />

      <InputField
        label="나이"
        placeholder="만 나이를 입력하세요."
        value={form.age}
        onChangeText={(text) => handleChange("age", text)}
        errorMessage={errors.age}
      />

      <RadioButtonGroup
        selectedValue={form.gender}
        onValueChange={(value) => handleChange("gender", value)}
      />
      {errors.gender ? (
        <Text style={styles.errorText}>{errors.gender}</Text>
      ) : null}

      <ToggleSwitch
        value={form.notifications}
        onValueChange={(value) => handleChange("notifications", value)}
      />

      <View style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}>
        <Button text="가입하기" size="lg" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 20,
    backgroundColor: "#FCFCFC",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default RegistrationForm;
