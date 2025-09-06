import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  preferredGender?: string[];
  description?: string;
};

const genderMap: Record<string, string> = {
  MALE: "남성",
  FEMALE: "여성",
  ANY: "성별 무관",
};

const DescriptionSection: React.FC<Props> = ({ preferredGender = [], description = "" }) => {
  const displayGender =
    preferredGender.length === 0
      ? "-"
      : preferredGender.includes("ANY")
        ? "성별 무관"
        : preferredGender.map((g) => genderMap[g] || g).join(", ");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>부가설명</Text>
      <View style={styles.genderRow}>
        <Text style={styles.genderLabel}>모집 성별</Text>
        <Text style={styles.genderValue}>{displayGender}</Text>
      </View>
      <Text style={styles.description}>{description || "-"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  title: {
    color: '#17171B',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    paddingVertical: 16,
    marginTop: 10,
  },
  genderLabel: {
    color: '#17171B',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    width: 108,
  },
  genderValue: {
    color: '#17171B',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    flex: 1,
  },
  description: {
    color: '#17171B',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    lineHeight: 21,
    marginTop: 10,
  },
});

export default DescriptionSection;
