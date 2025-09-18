import { Etc } from '@/shared/types/userProfile';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InfoSection } from '../InfoSection';

interface OtherHabitsContentProps {
  etc: Etc;
}

export const OtherHabitsContent: React.FC<OtherHabitsContentProps> = ({ etc }) => {
  if (!etc) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoSection title="흡연 여부" value={etc.smoking} />
        <InfoSection title="키우는 반려 동물" value={etc.pet.length > 0 ? etc.pet.join(', ') : '없음'} showBorder={false} />
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
