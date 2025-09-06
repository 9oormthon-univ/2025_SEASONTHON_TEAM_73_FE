import { COLORS, FONT_SIZE, FONTS } from "@/shared/styles";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  const title = "성향 조사";

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: title,
        headerTitleStyle: { fontFamily: FONTS.bold, fontSize: FONT_SIZE.b1 },
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
