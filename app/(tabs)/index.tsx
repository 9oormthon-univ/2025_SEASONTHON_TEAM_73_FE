import { COLORS, SPACING } from "@/shared/styles";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 42,
      }}
    >
      <Text>홈</Text>
      <TouchableOpacity onPress={() => router.push("/post-create")}>
        <Text
          style={{ padding: SPACING.xs, backgroundColor: COLORS.primary[50] }}
        >
          방 생성 화면으로 이동
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
