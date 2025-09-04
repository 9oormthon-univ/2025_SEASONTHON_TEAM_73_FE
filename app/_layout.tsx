import { useAuthStore } from "@/shared/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  const { isLoggedIn } = useAuthStore();

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
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
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
