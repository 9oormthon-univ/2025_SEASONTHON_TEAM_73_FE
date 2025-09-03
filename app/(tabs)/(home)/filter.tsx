import { Button } from "@/shared/components";
import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { RangeSlider } from "@/widgets/home/components";
import { ROOM_TYPE } from "@/widgets/home/constants";
import { useDefaultFilter } from "@/widgets/home/contexts";
import { PostCreateField } from "@/widgets/post-create/components";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FilterScreen() {
  const {
    deposit,
    rent,
    roomType,
    setRoomType,
    gender,
    setGender,
    setDepositRange,
    setRentRange,
    setApplied,
  } = useDefaultFilter();

  const handleDepositChange = useCallback(
    (depositMin: number, depositMax: number) => {
      setDepositRange(depositMin, depositMax);
    },
    [setDepositRange]
  );

  const handleRentChange = useCallback(
    (rentMin: number, rentMax: number) => {
      setRentRange(rentMin, rentMax);
    },
    [setRentRange]
  );

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.selectContainer}>
          <View style={styles.headerWrapper}>
            <Text style={styles.title}>보증금</Text>
            <Text style={styles.description}>
              {`${deposit.min}~${deposit.max}만원`}
            </Text>
          </View>
          <RangeSlider
            onValueChanged={handleDepositChange}
            min={0}
            max={100}
            low={deposit.min}
            high={deposit.max}
            step={1}
          />
        </View>
        <View style={styles.selectContainer}>
          <View style={styles.headerWrapper}>
            <Text style={styles.title}>월세</Text>
            <Text
              style={styles.description}
            >{`${rent.min}~${rent.max}만원`}</Text>
          </View>
          <RangeSlider
            onValueChanged={handleRentChange}
            min={0}
            max={100}
            low={rent.min}
            high={rent.max}
            step={1}
          />
        </View>
        <View style={styles.selectContainer}>
          <View style={styles.headerWrapper}>
            <Text style={styles.title}>방 형태</Text>
            <Text style={styles.description}>
              {roomType && roomType.length > 0
                ? roomType.map((val) => ROOM_TYPE[val]).join(", ")
                : "선택안함"}
            </Text>
          </View>
          <PostCreateField.MultiRadio
            items={ROOM_TYPE}
            selected={roomType ?? []}
            setSelected={(selected) => setRoomType(selected)}
            isMultiSelect
          />
        </View>
        <View style={styles.selectContainer}>
          <View style={styles.headerWrapper}>
            <Text style={styles.title}>성별</Text>
            <Text style={styles.description}>
              {gender && gender.length > 0
                ? gender.map((val) => ["남성", "여성"][val]).join(", ")
                : "선택안함"}
            </Text>
          </View>
          <PostCreateField.Radio
            items={["남성", "여성"]}
            selected={gender ?? []}
            setSelected={setGender}
            isMultiSelect
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          size="lg"
          text="적용"
          onPress={() => {
            setApplied(true);
            router.back();
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
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
    paddingHorizontal: SPACING.normal,
    paddingVertical: SPACING.lg,
    gap: SPACING.lg,
  },
  buttonWrapper: {
    paddingHorizontal: SPACING.normal,
    paddingVertical: SPACING.sm,
    alignItems: "flex-end",
  },
});
