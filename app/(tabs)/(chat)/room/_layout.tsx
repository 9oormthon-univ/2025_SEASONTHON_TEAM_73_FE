import { COLORS, FONT_SIZE, FONTS } from "@/shared/styles";
import { FilterDefaultProvider } from "@/widgets/home/contexts";
import { Stack } from "expo-router";

export default function RoomLayout() {
  return (
    <FilterDefaultProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitleStyle: { fontFamily: FONTS.bold, fontSize: FONT_SIZE.b1 },
          contentStyle: { backgroundColor: COLORS.white },
        }}
      >
        <Stack.Screen 
          name="[roomId]"
          options={({
            route,
          }: {
            route: { params?: { senderName?: string } }
          }) => ({
            headerTitle: route.params?.senderName ?? "Unknown Sender",
            headerBackVisible: true,
          })}
        />
      </Stack>
    </FilterDefaultProvider>
  );
}
