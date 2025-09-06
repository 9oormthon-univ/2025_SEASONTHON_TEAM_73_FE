import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  depositShare: boolean;
  rentShare: boolean;
  maintenanceShare: boolean;
  utilitiesShare: boolean;
};

const PriceSection: React.FC<Props> = ({
  deposit,
  monthlyRent,
  maintenanceFee,
  depositShare,
  rentShare,
  maintenanceShare,
  utilitiesShare
}) => {
  const tags = [];
  if (depositShare) tags.push("보증금 분담");
  if (rentShare) tags.push("월세 분담");
  if (maintenanceShare) tags.push("관리비 분담");
  if (utilitiesShare) tags.push("공과금 분담");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>가격정보</Text>
      <View style={styles.priceList}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>보증금</Text>
          <Text style={styles.priceValue}>{deposit}만원</Text>
        </View>
        <View style={styles.priceRowWithBorder}>
          <Text style={styles.priceLabel}>월세</Text>
          <Text style={styles.priceValue}>{monthlyRent}만원</Text>
        </View>
        <View style={styles.priceRowLast}>
          <Text style={styles.priceLabel}>관리비</Text>
          <Text style={styles.priceValue}>{maintenanceFee}만원</Text>
        </View>
      </View>
      <View style={styles.tagContainer}>
        {tags.map((tag, idx) => (
          <View style={styles.tag} key={idx}>
            <Text style={styles.tagText}>{tag}</Text>
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
  priceList: {
    marginTop: 10,
    width: '100%',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    paddingVertical: 16,
  },
  priceRowWithBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    paddingVertical: 16,
  },
  priceRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  priceLabel: {
    color: '#17171B',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    width: 108,
  },
  priceValue: {
    color: '#17171B',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
    flex: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  tag: {
    borderRadius: 4,
    backgroundColor: '#E5E5E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    color: '#717173',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'SUIT Variable, -apple-system, Roboto, Helvetica, sans-serif',
  },
});

export default PriceSection;
