import { CleaningHabit } from '@/shared/types/userProfile';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InfoSection } from '../InfoSection';

interface CleaningHabitContentProps {
  cleaningHabit: CleaningHabit;
}

export const CleaningHabitContent: React.FC<CleaningHabitContentProps> = ({ cleaningHabit }) => {
  if (!cleaningHabit) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoSection title="정리정돈 성향" value={cleaningHabit.tidinessLevel} />
        <InfoSection title="화장실 청결 민감도" value={cleaningHabit.bathroomCleaningLevel} showBorder={false} />
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
