import { COLORS, FONT_SIZE, FONTS } from "@/shared/styles";
import { FilterDefaultProvider } from "@/widgets/home/contexts";
import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <FilterDefaultProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleStyle: { fontFamily: FONTS.bold, fontSize: FONT_SIZE.b1 },
          contentStyle: { backgroundColor: COLORS.white },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "마이페이지" }}/>
        <Stack.Screen name="verify" options={{ headerShown: true, headerTitle: "2단계 인증" }}/>

      </Stack>
    </FilterDefaultProvider>
  );
}
