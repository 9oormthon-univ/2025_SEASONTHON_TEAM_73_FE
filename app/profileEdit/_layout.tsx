import { COLORS, FONT_SIZE, FONTS } from "@/shared/styles";
import { FilterDefaultProvider } from "@/widgets/home/contexts";
import { Stack } from "expo-router";

export default function ProfileEditLayout() {
  return (
    <FilterDefaultProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleStyle: { fontFamily: FONTS.bold, fontSize: FONT_SIZE.b1 },
          contentStyle: { backgroundColor: COLORS.white },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "프로필 수정" }}/>

      </Stack>
    </FilterDefaultProvider>
  );
}
