import { COLORS, FONTS } from "@/shared/styles";
import { Image } from "expo-image";
import { Tabs, usePathname } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  const isUserScreen = usePathname().includes("/users");
  const isRoomScreen = usePathname().includes("/rooms");
  const isUserSearchScreen = usePathname().includes("/user-search");
  const isPostCreateScreen = usePathname().includes("/post-create");
  const isDetailScreen = usePathname().includes("/detail");
  const isChatScreen = usePathname().includes("/chat/rooms");
  const isProfileScreen = usePathname().includes("/profile");

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
              isDetailScreen ||
              isChatScreen ||
              isProfileScreen
                ? "none"
                : "flex",
            borderTopWidth: 1,
            height: 68,
            paddingTop: 10,
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
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("@/assets/icons/icon-home-sel.svg")}
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require("@/assets/icons/icon-home.svg")}
                  style={styles.icon}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            tabBarLabel: "지도",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("@/assets/icons/icon-map-sel.svg")}
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require("@/assets/icons/icon-map.svg")}
                  style={styles.icon}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            tabBarLabel: "채팅",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("@/assets/icons/icon-chat-sel.svg")}
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require("@/assets/icons/icon-chat.svg")}
                  style={styles.icon}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            tabBarLabel: "My",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("@/assets/icons/icon-my-sel.svg")}
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require("@/assets/icons/icon-my.svg")}
                  style={styles.icon}
                />
              ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
});
