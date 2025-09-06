import { COLORS, FONT_SIZE, FONTS } from '@/shared/styles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  roomType: string;
  areaSize: number;
  floor: number;
  buildingFloor: number;
  roomCount: number;
  washroomCount: number;
  hasElevator: boolean;
  availableDate: string;
  minStayMonths: number;
  maxStayMonths: number;
};

const PropertyInfo: React.FC<Props> = ({
  roomType,
  areaSize,
  floor,
  buildingFloor,
  roomCount,
  washroomCount,
  hasElevator,
  availableDate,
  minStayMonths,
  maxStayMonths
}) => {
  const formatDate = (date?: string) => {
    if (!date) return "-";
    return date.split("T")[0];
  };

  const infoItems = [
    { label: "방 종류", value: roomType || "-" },
    { label: "전용 면적", value: areaSize ? `${areaSize}㎡` : "-" },
    { label: "해당층/최고층", value: floor && buildingFloor ? `${floor}/${buildingFloor}` : "-" },
    { label: "방 개수", value: roomCount ? `${roomCount}개` : "-" },
    { label: "화장실 개수", value: washroomCount ? `${washroomCount}개` : "-" },
    { label: "엘리베이터", value: hasElevator ? "있음" : "없음" },
    { label: "입주 가능일", value: formatDate(availableDate) },
    { label: "최소 거주 기간", value: minStayMonths ? `${minStayMonths}개월` : "-" },
    { label: "최대 거주 기간", value: maxStayMonths ? `${maxStayMonths}개월` : "-" },
  ];


  return (
    <View style={styles.container}>
      <Text style={styles.title}>상세정보</Text>
      <View style={styles.infoList}>
        {infoItems.map((item, index) => (
          <View
            key={index}
            style={[
              styles.infoRow,
              index < infoItems.length - 1 && styles.infoRowWithBorder
            ]}
          >
            <Text style={styles.infoLabel}>{item.label}</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderBottomColor: '#F2F2F2',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  title: {
    color: COLORS.black,
    fontSize: FONT_SIZE.b1,
    fontWeight: '700',
    fontFamily: FONTS.bold,
  },
  infoList: {
    marginTop: 10,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  infoRowWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  infoLabel: {
    color: COLORS.black,
    fontSize: FONT_SIZE.b2,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    width: 108,
  },
  infoValue: {
    color: COLORS.black,
    fontSize: FONT_SIZE.b2,
    fontWeight: '400',
    fontFamily: FONTS.regular,
    flex: 1,
  },
});

export default PropertyInfo;
