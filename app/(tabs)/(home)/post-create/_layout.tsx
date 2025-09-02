import { COLORS, FONT_SIZE, FONTS } from "@/shared/styles";
import { Stack } from "expo-router";

export default function PostCreateLayout() {
  const title = "새 룸메이트 구하기";

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
      <Stack.Screen name="cost" />
      <Stack.Screen name="description" />
    </Stack>
  );
}
