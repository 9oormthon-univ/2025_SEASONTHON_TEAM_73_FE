import { Header } from "@/shared/components";
import { COLORS } from "@/shared/styles";
import { FilterDefaultProvider } from "@/widgets/home/contexts";
import { UserFilterProvider } from "@/widgets/home/contexts/filterUserDefault";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <FilterDefaultProvider>
      <UserFilterProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            header: (props) => (
              <Header
                title={
                  props.options.title || (props.options.headerTitle as string)
                }
              />
            ),
            contentStyle: { backgroundColor: COLORS.white },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="post-create" />
          <Stack.Screen
            name="users"
            options={{ headerShown: true, title: "내가 찜한 사용자" }}
          />
          <Stack.Screen name="user-search" options={{ headerShown: false }} />
          <Stack.Screen
            name="rooms"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </UserFilterProvider>
    </FilterDefaultProvider>
  );
}
