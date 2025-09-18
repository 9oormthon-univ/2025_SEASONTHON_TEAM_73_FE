import { Header } from "@/shared/components";
import { COLORS } from "@/shared/styles";
import { FilterDefaultProvider } from "@/widgets/home/contexts";
import { Stack } from "expo-router";

export default function RoomLayout() {
  return (
    <FilterDefaultProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          contentStyle: { backgroundColor: COLORS.white },
          header: (props) => (
            <Header
              title={
                (props.options.headerTitle as string) ||
                (props.options.title as string)
              }
            />
          ),
        }}
      >
        <Stack.Screen
          name="[roomId]"
          options={({
            route,
          }: {
            route: { params?: { senderName?: string } };
          }) => ({
            headerTitle: route.params?.senderName ?? "Unknown Sender",
            headerBackVisible: true,
          })}
        />
        <Stack.Screen name="user-detail" options={{ title: "프로필" }} />
      </Stack>
    </FilterDefaultProvider>
  );
}
