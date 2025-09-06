import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WeekDayChips } from './WeekDayChips';

interface WorkScheduleSectionProps {
  activeDays?: boolean[];
}

export const WorkScheduleSection: React.FC<WorkScheduleSectionProps> = ({ activeDays }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>출근</Text>
      <WeekDayChips activeDays={activeDays} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  title: {
    alignSelf: 'stretch',
    color: '#17171B',
    fontFamily: "'SUIT Variable',-apple-system,Roboto,Helvetica,sans-serif",
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
});
