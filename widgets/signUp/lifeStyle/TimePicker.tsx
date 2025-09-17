import { COLORS, FONT_SIZE } from "@/shared/styles";
import React, { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DropdownArrow } from "./DropdownArrow";

interface TimePickerProps {
  label: string;
  time?: string;
  onTimeChange: (time: string) => void;
  showExpanded?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  time,
  onTimeChange,
  showExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(showExpanded);
  const [selectedHour, setSelectedHour] = useState("00");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [isHighlighted, setIsHighlighted] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
    console.log(`TimePicker ${isExpanded ? "닫힘" : "열림"}`);
  };

  const onScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    type: "hour" | "minute"
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / 40);
    if (type === "hour") {
      const clampedIndex = Math.max(0, Math.min(index, hours.length - 1));
      const newHour = hours[clampedIndex];
      setSelectedHour(newHour);
    } else {
      const clampedIndex = Math.max(0, Math.min(index, minutes.length - 1));
      const newMinute = minutes[clampedIndex];
      setSelectedMinute(newMinute);
    }
  };

  const onScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    type: "hour" | "minute"
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / 40); // item height
    if (type === "hour") {
      const clampedIndex = Math.max(0, Math.min(index, hours.length - 1));
      const newHour = hours[clampedIndex];
      setSelectedHour(newHour);
      console.log(`${newHour}:${selectedMinute}`);
    } else {
      const clampedIndex = Math.max(0, Math.min(index, minutes.length - 1));
      const newMinute = minutes[clampedIndex];
      setSelectedMinute(newMinute);
      console.log(`${selectedHour}:${newMinute}`);
    }
  };

  const handleConfirm = () => {
    const newTime = `${selectedHour}:${selectedMinute}`;
    console.log(`${newTime}`);
    onTimeChange(newTime);
    setIsExpanded(false);
    setIsHighlighted(true);
  };

  const renderItem = ({
    item,
    selected,
  }: {
    item: string;
    selected: boolean;
  }) => (
    <View style={[styles.itemContainer, selected && styles.selectedItem]}>
      <Text style={[styles.itemText, selected && styles.selectedItemText]}>
        {item}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 상단 */}
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.timeContainer}
          onPress={handleToggleExpanded}
        >
          <Text
            style={[
              styles.timeText,
              isHighlighted ? styles.selectedItemText : styles.timeText,
            ]}
          >
            {time}
          </Text>
          <DropdownArrow direction={isExpanded ? "up" : "down"} />
        </TouchableOpacity>
      </View>

      {/* 펼쳤을 때 */}
      {isExpanded && (
        <View style={styles.expandedContainer}>
          <View style={styles.timeSelectors}>
            {/* Hour List */}
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              snapToInterval={40}
              decelerationRate="fast"
              onScroll={(e) => onScroll(e, "hour")}
              onMomentumScrollEnd={(e) => onScrollEnd(e, "hour")}
              contentContainerStyle={styles.scrollContent}
            >
              {hours.map((item) => (
                <View key={item} style={styles.itemWrapper}>
                  {renderItem({ item, selected: item === selectedHour })}
                </View>
              ))}
            </ScrollView>

            {/* Minute List */}
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              snapToInterval={40}
              decelerationRate="fast"
              onScroll={(e) => onScroll(e, "minute")}
              onMomentumScrollEnd={(e) => onScrollEnd(e, "minute")}
              contentContainerStyle={styles.scrollContent}
            >
              {minutes.map((item) => (
                <View key={item} style={styles.itemWrapper}>
                  {renderItem({ item, selected: item === selectedMinute })}
                </View>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmText}>확인</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[5],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: FONT_SIZE.b2,
    color: COLORS.black,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeText: {
    fontSize: FONT_SIZE.b1,
    fontWeight: "700",
  },
  expandedContainer: {
    width: "100%",
    marginTop: 10,
    alignItems: "flex-end",
  },
  timeSelectors: {
    flexDirection: "row",
    gap: 20,
    height: 80, // 휠 높이
    width: "50%",
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20, // 상하 패딩으로 중앙 정렬 효과
  },
  itemWrapper: {
    height: 40,
  },
  itemContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: FONT_SIZE.b1,
    color: COLORS.black,
  },
  selectedItem: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.gray[50],
    width: "100%",
  },
  selectedItemText: {
    color: COLORS.primary[90],
    fontWeight: "700",
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary[90],
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.b2,
    fontWeight: "700",
  },
});
