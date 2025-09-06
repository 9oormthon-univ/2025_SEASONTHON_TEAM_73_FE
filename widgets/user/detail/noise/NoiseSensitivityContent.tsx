import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InfoSection } from '../InfoSection';

export const NoiseSensitivityContent: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoSection
          title="잠귀 민감도"
          value="7시 기상, 9시 출근"
        />
        <InfoSection
          title="잠버릇"
          value="18시 퇴근, 00시 취침"
        />
        <InfoSection
          title="나의 휴대폰 모드"
          value="11시 기상, 2시 취침"
        />
        <InfoSection
          title="나의 이어폰 사용"
          value="3회 이상"
          showBorder={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    left: 0,
    backgroundColor: '#FCFCFC',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
});
