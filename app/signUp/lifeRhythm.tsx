import { Toggle } from '@/shared/components/toggle/Toggle';
import { COLORS } from '@/shared/styles';
import ToggleOff from '@/widgets/signUp/lifeStyle/ToggleOff';
import ToggleOn from '@/widgets/signUp/lifeStyle/ToggleOn';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export const LifestyleSurvey: React.FC = () => {
  const [isWorkingStudying, setIsWorkingStudying] = useState(false);


  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>하루 리듬</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>출근, 등교 여부</Text>
          <Toggle
            isOn={isWorkingStudying}
            onToggle={setIsWorkingStudying}
          />
        </View>

        {isWorkingStudying ? (
            <ToggleOn isOn={isWorkingStudying} onToggle={setIsWorkingStudying} />
          ) : (
            <ToggleOff isOn={isWorkingStudying} onToggle={setIsWorkingStudying} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 189,
    backgroundColor:    COLORS.white,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: '#17171B',
    marginBottom: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    width: "100%",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    color: '#17171B',
  },
});

export default LifestyleSurvey;
