import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InfoSection } from './InfoSection';
import { WorkScheduleSection } from './WorkScheduleSection';

interface LifestyleContentProps {
  lifeHabit: any; // API 데이터 타입에 맞게 지정 가능
}

export const LifestyleContent: React.FC<LifestyleContentProps> = ({ lifeHabit }) => {
  if (!lifeHabit) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <WorkScheduleSection activeDays={lifeHabit?.workDaysBool} />
        <InfoSection
          title="기상 시간, 출근 시간"
          value={`${lifeHabit.wakeUpTimeWorkday} 기상, ${lifeHabit.goWorkTime} 출근`}
        />
        <InfoSection
          title="퇴근 시간, 취침 시간"
          value={`${lifeHabit.comeHomeTime} 퇴근, ${lifeHabit.sleepTimeWorkday} 취침`}
        />
        <InfoSection
          title="휴일 기상 시간, 휴일 취침 시간"
          value={`${lifeHabit.wakeUpTimeHoliday} 기상, ${lifeHabit.sleepTimeHoliday} 취침`}
        />
        <InfoSection
          title="알람 횟수"
          value={lifeHabit.alarmCount === 'ONCE' ? '1회' : lifeHabit.alarmCount === 'TWICE' ? '2회' : '3회 이상'}
          showBorder={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 18, paddingVertical: 20, flexDirection: 'column', alignItems: 'center', gap: 10, left: 0, backgroundColor: '#FCFCFC' },
  content: { flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch' },
});
