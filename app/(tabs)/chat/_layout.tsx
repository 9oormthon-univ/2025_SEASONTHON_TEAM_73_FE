import { Header } from "@/shared/components";
import { COLORS } from "@/shared/styles";
import { FilterDefaultProvider } from "@/widgets/home/contexts";
import { Stack } from "expo-router";

export default function ChatLayout() {
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
          options={{ headerShown: false, headerTitle: "채팅" }}
        />
        <Stack.Screen
          name="[roomId]"
          options={({ route }) => ({
            headerShown: true,
            headerTitle: "채팅",
          })}
        />
      </Stack>
    </FilterDefaultProvider>
  );
}
