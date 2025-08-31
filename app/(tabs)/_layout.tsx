import { FONTS } from "@/shared/styles";
import { Tabs } from "expo-router";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          height: 68,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          paddingTop: 4,
          paddingHorizontal: 20,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: FONTS.medium,
          includeFontPadding: false,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "홈" }} />
    </Tabs>
  );
}
