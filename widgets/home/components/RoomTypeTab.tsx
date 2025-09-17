import { GENDER } from "@/shared/constants";
import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import { RangeSlider } from "@/widgets/home/components";
import {
  DEPOSIT_STEP,
  MAX_DEPOSIT,
  MAX_RENT,
  RENT_STEP,
  ROOM_TYPE,
} from "@/widgets/home/constants";
import { PostCreateField } from "@/widgets/post-create/components";
import { StyleSheet, Text, View } from "react-native";

interface RoomTypeTabProps {
  localDeposit: [number, number];
  localRent: [number, number];
  localRoomTypes: string[];
  localGender: string[];
  onDepositChange: (depositMin: number, depositMax: number) => void;
  onRentChange: (rentMin: number, rentMax: number) => void;
  onRoomTypeChange: (roomTypes: string[]) => void;
  onGenderChange: (gender: string[]) => void;
}

export default function RoomTypeTab({
  localDeposit,
  localRent,
  localRoomTypes,
  localGender,
  onDepositChange,
  onRentChange,
  onRoomTypeChange,
  onGenderChange,
}: RoomTypeTabProps) {
  return (
    <>
      <View style={styles.selectContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>보증금</Text>
          <Text style={styles.description}>
            {`${localDeposit[0]}~${localDeposit[1]}만원`}
          </Text>
        </View>
        <RangeSlider
          onValueChanged={onDepositChange}
          min={0}
          max={MAX_DEPOSIT}
          low={localDeposit[0]}
          high={localDeposit[1]}
          step={DEPOSIT_STEP}
        />
      </View>

      <View style={styles.selectContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>월세</Text>
          <Text style={styles.description}>
            {`${localRent[0]}~${localRent[1]}만원`}
          </Text>
        </View>
        <RangeSlider
          onValueChanged={onRentChange}
          min={0}
          max={MAX_RENT}
          low={localRent[0]}
          high={localRent[1]}
          step={RENT_STEP}
        />
      </View>

      <View style={styles.selectContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>방 형태</Text>
          <Text style={styles.description}>
            {localRoomTypes && localRoomTypes.length > 0
              ? localRoomTypes
                  .map((val) => ROOM_TYPE[val as keyof typeof ROOM_TYPE])
                  .join(", ")
              : "선택안함"}
          </Text>
        </View>
        <PostCreateField.MultiRadio
          items={Object.values(ROOM_TYPE)}
          selected={
            localRoomTypes
              ?.map((type) => Object.keys(ROOM_TYPE).indexOf(type))
              .filter((index) => index !== -1) ?? []
          }
          setSelected={(selected) => {
            const keys = Object.keys(ROOM_TYPE);
            onRoomTypeChange(selected.map((index) => keys[index]));
          }}
          isMultiSelect
        />
      </View>

      <View style={styles.selectContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>성별</Text>
          <Text style={styles.description}>
            {localGender && localGender.length > 0
              ? localGender
                  .map((val) => GENDER[val as keyof typeof GENDER])
                  .join(", ")
              : "선택안함"}
          </Text>
        </View>
        <PostCreateField.Radio
          items={Object.values(GENDER)}
          selected={localGender.map((val) => Object.keys(GENDER).indexOf(val))}
          setSelected={(selected) => {
            const keys = Object.keys(GENDER);
            onGenderChange(selected.map((index) => keys[index]));
          }}
          isMultiSelect
        />
      </View>
    </>
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
});
