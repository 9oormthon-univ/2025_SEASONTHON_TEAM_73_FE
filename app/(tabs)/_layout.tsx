import { COLORS, FONTS } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  const isUserScreen = usePathname().includes("/users");
  const isRoomScreen = usePathname().includes("/rooms");
  const isUserSearchScreen = usePathname().includes("/user-search");
  const isPostCreateScreen = usePathname().includes("/post-create");
  const isDetailScreen = usePathname().includes("/detail");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary[90],
          tabBarInactiveTintColor: COLORS.gray[30],
          tabBarStyle: {
            display:
              isUserScreen ||
              isRoomScreen ||
              isUserSearchScreen ||
              isPostCreateScreen ||
              isDetailScreen
                ? "none"
                : "flex",
            borderTopWidth: 1,
            height: 68,
            paddingTop: 4,
            paddingHorizontal: 20,
            borderTopColor: COLORS.gray[10],
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: FONTS.medium,
            includeFontPadding: false,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            tabBarLabel: "홈",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            tabBarLabel: "지도",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            tabBarLabel: "채팅",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            tabBarLabel: "My",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
