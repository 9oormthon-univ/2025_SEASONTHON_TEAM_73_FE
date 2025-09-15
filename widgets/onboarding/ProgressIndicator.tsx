import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProgressIndicatorProps {
  currentStep?: number;
  totalSteps?: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep = 1,
  totalSteps = 3
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorWrapper}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === 0 ? styles.activeDot : styles.inactiveDot
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    display: 'flex',
    width: 68,
    gap: 10,
    justifyContent: 'center',
  },
  indicatorWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
  },
  dot: {
    borderRadius: 100,
    alignSelf: 'stretch',
    display: 'flex',
    flexShrink: 0,
    height: 8,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
  activeDot: {
    width: 36,
    backgroundColor: '#6287F2',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#E0E0E0',
  },
});
