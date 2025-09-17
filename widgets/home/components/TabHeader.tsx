import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("screen");

type TabType = "preference" | "roomType" | "region";

interface TabHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { key: "preference" as TabType, label: "성향" },
  { key: "roomType" as TabType, label: "집 유형" },
  { key: "region" as TabType, label: "지역" },
];

export default function TabHeader({ activeTab, onTabChange }: TabHeaderProps) {
  return (
    <View style={styles.header}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.headerTabButton,
            activeTab === tab.key && styles.activeTabButton,
          ]}
          onPress={() => onTabChange(tab.key)}
        >
          <Text
            style={[
              styles.headerTitle,
              activeTab === tab.key && styles.activeTabTitle,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
    marginBottom: SPACING.sm,
    flexDirection: "row",
  },
  headerTabButton: {
    paddingVertical: 12,
    width: width / 3,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: COLORS.primary[90],
  },
  headerTitle: {
    fontSize: FONT_SIZE.b2,
    fontFamily: FONTS.bold,
    color: COLORS.gray[50],
    textAlign: "center",
  },
  activeTabTitle: {
    color: COLORS.primary[90],
  },
});
