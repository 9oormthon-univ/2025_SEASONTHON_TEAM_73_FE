import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InfoSection } from '../InfoSection';

export const CleaningHabitContent: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoSection
          title="정리정돈 성향"
          value="7시 기상, 9시 출근"
        />
        <InfoSection
          title="화장실 청결 민감도"
          value="18시 퇴근, 00시 취침"
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
