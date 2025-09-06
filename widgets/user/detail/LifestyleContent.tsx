import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InfoSection } from './InfoSection';
import { WorkScheduleSection } from './WorkScheduleSection';

export const LifestyleContent: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <WorkScheduleSection activeDays={[true, true, true, true, true, false, false]} />
        <InfoSection
          title="기상 시간, 출근 시간"
          value="7시 기상, 9시 출근"
        />
        <InfoSection
          title="퇴근 시간, 취침 시간"
          value="18시 퇴근, 00시 취침"
        />
        <InfoSection
          title="휴일 기상 시간, 휴일 취침 시간"
          value="11시 기상, 2시 취침"
        />
        <InfoSection
          title="알람 횟수"
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
    paddingVertical: 20,
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
