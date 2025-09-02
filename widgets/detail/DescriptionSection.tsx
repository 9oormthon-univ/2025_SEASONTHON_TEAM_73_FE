import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DescriptionSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>부가설명</Text>
      <View style={styles.genderRow}>
        <Text style={styles.genderLabel}>모집 성별</Text>
        <Text style={styles.genderValue}>남성, 여성</Text>
      </View>
      <Text style={styles.description}>
        월세 반반 내면서 방 따로 쓰면서 같이 살 룸메 구해요..!{'\n'}
        짐이 적어서 제가 더 작은 방 써도 괜찮아요.{'\n'}
        제 프로필 들어가서 생활패턴 확인하시고, 얼추 맞는다 싶으면 채팅 걸어주세요!
      </Text>
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
