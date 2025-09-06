import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ROUTES, SIZES, TabsArray } from "../constants";
import { Box, Text } from "../theme";

import { COLORS, FONTS } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import Logo from "./Logo";

const { NAVIGATION_BOTTOM_TABS_HEIGHT } = SIZES;

interface TabsHandlerProps {
  tabs: TabsArray;
  tabWidth: number;
}

function TabsHandler({ tabs, tabWidth }: TabsHandlerProps) {
  const pathname = usePathname();

  function isActiveRoute(tabRoute: string): boolean {
    // console.log("Checking route:", tabRoute, "against pathname:", pathname);

    // 실제 라우트 매칭 로직
    // 홈 탭 - 기본 경로이면서 post-create가 아닌 경우
    if (tabRoute === ROUTES.A) {
      return (
        (pathname === "/" || pathname.startsWith("/(home)")) &&
        !pathname.includes("post-create")
      );
    }

    // 채팅 탭
    if (tabRoute === ROUTES.B) {
      return pathname.includes("chat");
    }

    // post-create 탭 (센터)
    if (tabRoute === ROUTES.C) {
      return pathname.includes("post-create");
    }

    // 지도 탭
    if (tabRoute === ROUTES.D) {
      return pathname.includes("map");
    }

    // 유저 탭
    if (tabRoute === ROUTES.E) {
      return pathname.includes("user");
    }

    return false;
  }

  function getTextColor(tabRoute: string): string {
    const isActive = isActiveRoute(tabRoute);
    return isActive ? COLORS.primary[90] : COLORS.gray[30];
  }

  function getIcon(tab: string): React.ReactElement | null {
    const isActive = isActiveRoute(tab);
    const iconColor = isActive ? COLORS.primary[90] : COLORS.gray[30];

    switch (tab) {
      case ROUTES.A: {
        return <Ionicons name="home" size={22} color={iconColor} />;
      }
      case ROUTES.B: {
        return <Ionicons name="chatbubble" size={22} color={iconColor} />;
      }
      case ROUTES.C: {
        return <Ionicons name="add-circle" size={22} color={iconColor} />;
      }
      case ROUTES.D: {
        return <Ionicons name="location" size={22} color={iconColor} />;
      }
      case ROUTES.E: {
        return <Ionicons name="person" size={22} color={iconColor} />;
      }
      default:
        break;
    }

    return null;
  }

  return (
    <Box flexDirection="row-reverse">
      {tabs.map((tab, key) => {
        if (key === Math.floor(tabs.length / 2)) {
          return (
            <Box
              key="logo"
              width={tabWidth}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap={4}
              height={NAVIGATION_BOTTOM_TABS_HEIGHT}
              pointerEvents="box-none"
            >
              <Box
                position="absolute"
                style={{
                  top: -NAVIGATION_BOTTOM_TABS_HEIGHT / 6,
                  zIndex: 1000,
                }}
                pointerEvents="box-none"
              >
                <Logo />
              </Box>
            </Box>
          );
        }

        return (
          <TouchableOpacity key={key} onPress={tab.action} activeOpacity={0.7}>
            <Box
              width={tabWidth}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap={4}
              height={NAVIGATION_BOTTOM_TABS_HEIGHT}
            >
              {getIcon(tab.route)}
              <Text style={[styles.text, { color: getTextColor(tab.route) }]}>
                {tab.name}
              </Text>
            </Box>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
});

export default TabsHandler;
