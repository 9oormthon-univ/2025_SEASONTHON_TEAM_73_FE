import { useAuthStore } from "@/shared/store";
import { useLikeStore } from "@/shared/store/likeStore";
import { COLORS } from "@/shared/styles";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LoadingScreen } from "./loading";

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
        // 로그인 상태일 때 좋아요 데이터 패치
        if (isLoggedIn) {
          await useLikeStore.getState().fetchLikes();
        }

        await SplashScreen.hideAsync(); // 스플래시 숨기기
        // 여기에서 초기 데이터 fetch, 토큰 검증 등 할 수 있음
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 테스트용 지연
        setAppReady(true);
      }
    };

    prepareApp();
  }, [fontsLoaded, isLoggedIn]);

  if (!appReady) {
    return <LoadingScreen />;
  }

  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: COLORS.white },
            }}
          >
            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="onboarding" />
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="login" />
            </Stack.Protected>
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(tabs)" />
            </Stack.Protected>
          </Stack>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
