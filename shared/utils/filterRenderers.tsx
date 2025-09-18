import { Toggle } from "@/shared/components/toggle/Toggle";
import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { RangeSlider } from "@/widgets/home/components";
import { PostCreateField } from "@/widgets/post-create/components";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  selectContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
    paddingVertical: SPACING.lg,
    gap: SPACING.lg,
    paddingHorizontal: SPACING.normal,
  },
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
  toggleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const renderRangeSlider = (
  title: string,
  description: string,
  value: [number, number],
  min: number,
  max: number,
  step: number,
  onValueChange: (min: number, max: number) => void
) => (
  <View style={styles.selectContainer}>
    <View style={styles.headerWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <RangeSlider
      onValueChanged={onValueChange}
      min={min}
      max={max}
      low={value[0]}
      high={value[1]}
      step={step}
    />
  </View>
);

export const renderToggle = (
  title: string,
  isOn: boolean,
  onToggle: (value: boolean) => void
) => (
  <View style={styles.selectContainer}>
    <View style={styles.toggleWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Toggle isOn={isOn} onToggle={onToggle} />
    </View>
  </View>
);

export const renderRadio = (
  title: string,
  description: string,
  items: string[],
  selected: number,
  onSelectionChange: (selected: number) => void
) => (
  <View style={styles.selectContainer}>
    <View style={styles.headerWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <PostCreateField.Radio
      items={items}
      selected={[selected]}
      setSelected={(selectedArray) => onSelectionChange(selectedArray[0])}
    />
  </View>
);

export const renderMultiRadio = (
  title: string,
  description: string,
  items: string[],
  selected: number[],
  onSelectionChange: (selected: number[]) => void,
  isMultiSelect: boolean = true
) => (
  <View style={styles.selectContainer}>
    <View style={styles.headerWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <PostCreateField.MultiRadio
      items={items}
      selected={selected}
      setSelected={onSelectionChange}
      isMultiSelect={isMultiSelect}
    />
  </View>
);

export const renderFilterContainer = (children: React.ReactNode) => (
  <View style={styles.selectContainer}>{children}</View>
);

export const renderFilterHeader = (title: string, description: string) => (
  <View style={styles.headerWrapper}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);
