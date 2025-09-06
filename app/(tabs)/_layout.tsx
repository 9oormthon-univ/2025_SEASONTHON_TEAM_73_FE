import { ROUTES, TabsUI, type TabsArray } from "@/widgets/menu";
import { Tabs, router, type Href } from "expo-router";

const tabs: TabsArray = [
  {
    name: "My",
    route: ROUTES.E,
    action: () => router.push(ROUTES.E as Href),
  },
  {
    name: "채팅",
    route: ROUTES.B,
    action: () => router.push(ROUTES.B as Href),
  },
  {
    name: "센터",
    route: ROUTES.C,
    action: () => router.push(ROUTES.C as Href),
  },
  {
    name: "지도",
    route: ROUTES.D,
    action: () => router.push(ROUTES.D as Href),
  },
  {
    name: "홈",
    route: ROUTES.A,
    action: () => router.push(ROUTES.A as Href),
  },
];

export default function HomeLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" }, // 기본 탭바 숨기기
        }}
      >
        <Tabs.Screen name="(home)" />
        <Tabs.Screen name="(chat)" />
        <Tabs.Screen name="map" />
        <Tabs.Screen name="user" />
      </Tabs>

      {/* 커스텀 탭바 */}
      <TabsUI tabs={tabs} />
    </>
  );
}
