import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WeekDayChip } from './WeekDayChip';

interface WeekDayChipsProps {
  activeDays?: boolean[];
}

export const WeekDayChips: React.FC<WeekDayChipsProps> = ({
  activeDays = [true, true, true, true, true, false, false]
}) => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <WeekDayChip
          key={index}
          day={day}
          isActive={activeDays[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 324,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
