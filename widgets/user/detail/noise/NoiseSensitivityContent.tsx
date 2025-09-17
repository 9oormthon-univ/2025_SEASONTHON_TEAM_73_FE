import { SoundSensitivity } from '@/shared/types/userProfile';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InfoSection } from '../InfoSection';

interface NoiseSensitivityContentProps {
  soundSensitivity: SoundSensitivity;
}

export const NoiseSensitivityContent: React.FC<NoiseSensitivityContentProps> = ({ soundSensitivity }) => {
  if (!soundSensitivity) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoSection title="잠귀 민감도" value={soundSensitivity.sleepLevel} />
        <InfoSection 
          title="잠버릇" 
          value={
            !soundSensitivity.sleepHabit || soundSensitivity.sleepHabit.length === 0 || soundSensitivity.sleepHabit[0] === "없음"
              ? "없음"
              : soundSensitivity.sleepHabit.join(', ')
          } 
        />
        <InfoSection title="나의 휴대폰 모드" value={soundSensitivity.phoneMode} />
        <InfoSection title="나의 이어폰 사용" value={soundSensitivity.earphoneUsage} showBorder={false} />
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
