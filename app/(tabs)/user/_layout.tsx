import { Header } from "@/shared/components";
import { COLORS } from "@/shared/styles";
import { FilterDefaultProvider } from "@/widgets/home/contexts";
import { Stack } from "expo-router";

export default function UserLayout() {
  return (
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
          options={{ headerShown: true, headerTitle: "마이페이지" }}
        />
        <Stack.Screen
          name="verify"
          options={{ headerShown: true, headerTitle: "2단계 인증" }}
        />
        <Stack.Screen
          name="profile-edit"
          options={{ headerShown: true, headerTitle: "프로필 수정" }}
        />
      </Stack>
    </FilterDefaultProvider>
  );
}
