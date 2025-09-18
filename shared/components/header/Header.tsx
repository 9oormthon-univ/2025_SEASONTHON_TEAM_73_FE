import { FONTS, FONT_SIZE, SPACING } from "@/shared/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={20} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.normal,
    paddingVertical: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  title: { fontFamily: FONTS.bold, fontSize: FONT_SIZE.b1 },
});
