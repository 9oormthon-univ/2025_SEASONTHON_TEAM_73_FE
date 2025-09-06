import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs, usePathname } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function HomeLayout() {
  const pathname = usePathname();
  const isDetailScreen = pathname.includes("/detail");
  const isFilterScreen = pathname.includes("/filter");
  const isRegionScreen = pathname.includes("/region");
  const isPostCreateScreen = pathname.includes("/post-create");
  const isChatScreen = pathname.includes("/room");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary[90],
        tabBarInactiveTintColor: COLORS.gray[30],
        tabBarStyle:
          isDetailScreen ||
          isFilterScreen ||
          isRegionScreen ||
          isPostCreateScreen ||
          isChatScreen
            ? { display: "none" }
            : {
                boxShadow: `0 -2px 4px 0 rgba(0, 0, 0, 0.05)`,
                height: 80,
                paddingHorizontal: SPACING.normal,
              },
        tabBarItemStyle: { paddingTop: 10 },
        tabBarLabelStyle: {
          marginTop: SPACING.xxs,
          fontSize: FONT_SIZE.c1,
          fontFamily: FONTS.medium,
          includeFontPadding: false,
        },
        tabBarVisibilityAnimationConfig: {
          hide: { animation: "timing", config: { duration: 0 } },
        },
        tabBarButton: (props: BottomTabBarButtonProps) => (
          <TouchableOpacity {...(props as any)} activeOpacity={0.5} />
        ),
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="(chat)"
        options={{
          title: "채팅",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "지도",
          tabBarIcon: ({ color }) => (
            <Ionicons name="location" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="(user)"
        options={{
          title: "My",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
