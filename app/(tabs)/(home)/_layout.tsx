import { COLORS, FONT_SIZE, FONTS } from "@/shared/styles";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleStyle: { fontFamily: FONTS.bold, fontSize: FONT_SIZE.b1 },
        contentStyle: { backgroundColor: COLORS.white },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="region"
        options={{ headerShown: true, headerTitle: "지역 필터" }}
      />
      <Stack.Screen
        name="filter"
        options={{ headerShown: true, headerTitle: "필터" }}
      />
    </Stack>
  );
}
