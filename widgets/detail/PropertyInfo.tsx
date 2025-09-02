import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PropertyInfo: React.FC = () => {
  const infoItems = [
    { label: '방 종류', value: '투룸' },
    { label: '전용 면적', value: '18.73㎡' },
    { label: '해당층/최고층', value: '3/12' },
    { label: '방 개수', value: '2개' },
    { label: '화장실 개수', value: '1개' },
    { label: '난방 구조', value: '중앙 난방' },
    { label: '엘리베이터', value: '있음' },
    { label: '입주 가능일', value: '2025.09.05' },
    { label: '최소 거주 기간', value: '4개월' },
    { label: '최대 거주 기간', value: '12개월' },
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
    color: '#17171B',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
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
    color: '#17171B',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    width: 108,
  },
  infoValue: {
    color: '#17171B',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    flex: 1,
  },
});

export default PropertyInfo;
