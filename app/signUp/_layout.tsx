import { COLORS, FONT_SIZE, FONTS } from "@/shared/styles";
import { FilterDefaultProvider } from "@/widgets/home/contexts";
import { Stack } from "expo-router";

export default function SignUpLayout() {
  return (
    <FilterDefaultProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleStyle: { fontFamily: FONTS.bold, fontSize: FONT_SIZE.b1 },
          contentStyle: { backgroundColor: COLORS.white },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "회원가입" }}/>
        <Stack.Screen name="messageVerify" options={{ headerShown: true, headerTitle: "문자 인증" }}/>

      </Stack>
    </FilterDefaultProvider>
  );
}
