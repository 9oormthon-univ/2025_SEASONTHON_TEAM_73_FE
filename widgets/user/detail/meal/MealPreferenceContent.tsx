import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InfoSection } from '../InfoSection';

interface MealPreferenceContentProps {
  mealHabit: any;
}

export const MealPreferenceContent: React.FC<MealPreferenceContentProps> = ({ mealHabit }) => {
  if (!mealHabit) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoSection title="주 요리 횟수" value={mealHabit.cookingCount} />
        <InfoSection title="음식 냄새 민감도" value={mealHabit.smellLevel} />
        <InfoSection title="주 음주 횟수" value={mealHabit.alcoholCount} />
        <InfoSection title="사용 식기" value={mealHabit.dishShare} showBorder={false} />
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
