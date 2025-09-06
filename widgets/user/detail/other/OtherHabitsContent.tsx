import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InfoSection } from '../InfoSection';

export const OtherHabitsContent: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoSection
          title="흡연 여부"
          value="7시 기상, 9시 출근"
        />
        <InfoSection
          title="키우는 반려 동물"
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
