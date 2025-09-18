import { Header } from "@/shared/components";
import { COLORS } from "@/shared/styles";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  const title = "성향 조사";

  return (
    <Stack
      screenOptions={{
        header: () => <Header title={title} />,
        contentStyle: { backgroundColor: COLORS.white },
        animation: "none",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="second" />
      <Stack.Screen name="third" />
      <Stack.Screen name="fourth" />
    </Stack>
  );
}
