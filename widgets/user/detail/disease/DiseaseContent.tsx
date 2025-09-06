import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InfoSection } from '../InfoSection';

interface DiseaseContentProps {
  disease: string;
}

export const DiseaseContent: React.FC<DiseaseContentProps> = ({ disease }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoSection title="질병 여부" value={disease || '없음'} showBorder={false} />
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
