import { useAuthStore } from "@/shared/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import LoadingScreen from "./loading"; // 로딩화면 컴포넌트

SplashScreen.preventAutoHideAsync(); // 스플래시 화면 유지

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();
  const [appReady, setAppReady] = useState(false);

  // 1️⃣ 폰트 로드
  const [fontsLoaded] = useFonts({
    "SUIT-Regular": require("../assets/fonts/SUIT-Regular.ttf"),
    "SUIT-Medium": require("../assets/fonts/SUIT-Medium.ttf"),
    "SUIT-SemiBold": require("../assets/fonts/SUIT-SemiBold.ttf"),
    "SUIT-Bold": require("../assets/fonts/SUIT-Bold.ttf"),
    "SUIT-Light": require("../assets/fonts/SUIT-Light.ttf"),
    "SUIT-Thin": require("../assets/fonts/SUIT-Thin.ttf"),
    "SUIT-ExtraLight": require("../assets/fonts/SUIT-ExtraLight.ttf"),
    "SUIT-ExtraBold": require("../assets/fonts/SUIT-ExtraBold.ttf"),
    "SUIT-Heavy": require("../assets/fonts/SUIT-Heavy.ttf"),
  });

  useEffect(() => {
    const prepareApp = async () => {
      // 폰트가 다 로드되었는지 체크
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); // 스플래시 숨기기
        // 여기에서 초기 데이터 fetch, 토큰 검증 등 할 수 있음
        await new Promise(resolve => setTimeout(resolve, 10000)); // 테스트용 지연
        setAppReady(true);
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!appReady) {
    // 폰트 + 초기화가 끝나기 전까지 로딩 화면
    return <LoadingScreen />;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="login" />
        </Stack.Protected>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
    </QueryClientProvider>
  );
}
