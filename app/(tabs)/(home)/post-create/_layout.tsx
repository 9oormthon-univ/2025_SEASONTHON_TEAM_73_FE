import { Header } from "@/shared/components";
import { COLORS } from "@/shared/styles";
import { PostCreateProvider } from "@/widgets/post-create/contexts";
import { Stack } from "expo-router";

export default function PostCreateLayout() {
  return (
    <PostCreateProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => <Header title="새 룸메이트 구하기" />,
          contentStyle: { backgroundColor: COLORS.white },
          animation: "none",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="cost" />
        <Stack.Screen name="description" />
      </Stack>
    </PostCreateProvider>
  );
}
