import React, { useMemo } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HIDDEN_TABBAR_PATHS, SIZES, TabsArray } from "../constants";
import { Box } from "../theme";

import { usePathname } from "expo-router";
import TabsShape from "./Tab";
import TabsHandler from "./TabsHandler";

const { NAVIGATION_BOTTOM_TABS_HEIGHT } = SIZES;
const { width: wWidth } = Dimensions.get("window");

interface TabsUIProps {
  tabs: TabsArray;
}

function TabsUI({ tabs }: TabsUIProps) {
  const { bottom } = useSafeAreaInsets();
  const tabWidth = useMemo(() => wWidth / tabs.length, [tabs.length]);
  const pathname = usePathname();

  const shouldHideTabBar = useMemo(() => {
    const shouldHide = HIDDEN_TABBAR_PATHS.some((path) =>
      pathname.includes(path)
    );
    return shouldHide;
  }, [pathname]);

  if (shouldHideTabBar) {
    return null;
  }

  return (
    <>
      <Box
        height={NAVIGATION_BOTTOM_TABS_HEIGHT}
        width={wWidth}
        position="absolute"
        backgroundColor="transparent"
        style={{ bottom }}
      >
        <TabsShape tabWidth={tabWidth} />
        <Box style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <TabsHandler tabs={tabs} tabWidth={tabWidth} />
        </Box>
      </Box>
    </>
  );
}

export default TabsUI;
