import { COLORS, FONT_SIZE, FONTS } from "@/shared/styles";
import { Stack } from "expo-router";

export default function PostCreateLayout() {
  const title = "";

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: title,
        headerTitleStyle: { fontFamily: FONTS.bold, fontSize: FONT_SIZE.b1 },
        contentStyle: { backgroundColor: COLORS.white },
        animation: "none",
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
