import { Header } from "@/shared/components";
import { COLORS } from "@/shared/styles";
import { FilterDefaultProvider } from "@/widgets/home/contexts";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FilterDefaultProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            header: (props) => (
              <Header title={props.options.headerTitle as string} />
            ),
            contentStyle: { backgroundColor: COLORS.white },
          }}
        >
          <Stack.Screen
            name="index"
            options={{ headerShown: true, headerTitle: "회원가입" }}
          />
          <Stack.Screen
            name="message-verify"
            options={{ headerShown: true, headerTitle: "문자 인증" }}
          />
          <Stack.Screen
            name="life-rhythm"
            options={{ headerShown: true, headerTitle: "성향 조사" }}
          />
        </Stack>
      </FilterDefaultProvider>
    </SafeAreaView>
  );
}
