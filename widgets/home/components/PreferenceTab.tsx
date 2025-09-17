import { GENDER } from "@/shared/constants";
import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { PostCreateField, Toggle } from "@/widgets/post-create/components";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PreferenceTab() {
  return (
    <ScrollView style={{ maxHeight: 510 }} showsVerticalScrollIndicator={false}>
      <View style={styles.selectContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>정리정돈 성향</Text>
          <Text style={styles.description}>ㅎㅇ</Text>
        </View>
        <PostCreateField.MultiRadio
          items={Object.values(GENDER)}
          selected={[]}
          setSelected={() => {}}
        />
      </View>
      <View style={styles.selectContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>흡연 여부</Text>
          <Toggle />
        </View>
      </View>
      <View style={styles.selectContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>반려동물 종류</Text>
          <Text style={styles.description}>ㅎㅇ</Text>
        </View>
        <PostCreateField.MultiRadio
          items={Object.values(GENDER)}
          selected={[]}
          setSelected={() => {}}
        />
      </View>
      <View style={styles.selectContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>주 음주 횟수</Text>
          <Text style={styles.description}>ㅎㅇ</Text>
        </View>
        <PostCreateField.MultiRadio
          items={Object.values(GENDER)}
          selected={[]}
          setSelected={() => {}}
        />
      </View>
      <View style={styles.selectContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>잠귀 민감도</Text>
          <Text style={styles.description}>ㅎㅇ</Text>
        </View>
        <PostCreateField.MultiRadio
          items={Object.values(GENDER)}
          selected={[]}
          setSelected={() => {}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  title: {
    fontFamily: FONTS.bold,
    includeFontPadding: false,
    fontSize: FONT_SIZE.b1,
  },
  description: {
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.bold,
    color: COLORS.primary[90],
  },
  selectContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
    paddingVertical: SPACING.lg,
    gap: SPACING.lg,
    paddingHorizontal: SPACING.normal,
  },
  placeholderContainer: {
    paddingVertical: SPACING.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: FONT_SIZE.c1,
    color: COLORS.gray[50],
    textAlign: "center",
  },
});
