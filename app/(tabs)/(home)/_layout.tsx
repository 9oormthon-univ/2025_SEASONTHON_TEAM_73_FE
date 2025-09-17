import { COLORS, FONT_SIZE, FONTS } from "@/shared/styles";
import { FilterDefaultProvider } from "@/widgets/home/contexts";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <FilterDefaultProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: FONT_SIZE.b1,
          },
          contentStyle: { backgroundColor: COLORS.white },
        }}
      >
        <Stack.Screen name="index" options={{ headerTitle: "홈" }} />
        <Stack.Screen
          name="region"
          options={{ headerShown: true, headerTitle: "지역 필터" }}
        />
        <Stack.Screen
          name="filter"
          options={{ headerShown: true, headerTitle: "필터" }}
        />
        <Stack.Screen name="post-create" />
        <Stack.Screen
          name="users"
          options={{ headerShown: true, headerTitle: "내가 찜한 사용자" }}
        />
        <Stack.Screen
          name="rooms"
          options={{
            headerShown: true,
            headerTitle: "Sharer 게시글",
          }}
        />
      </Stack>
    </FilterDefaultProvider>
  );
}
