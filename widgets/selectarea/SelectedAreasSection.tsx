import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AreaChip } from './AreaChip';

interface SelectedArea {
  id: string;
  name: string;
}

interface SelectedAreasSectionProps {
  selectedAreas: SelectedArea[];
  onRemoveArea: (id: string) => void;
}

export const SelectedAreasSection: React.FC<SelectedAreasSectionProps> = ({
  selectedAreas,
  onRemoveArea
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>선택한 지역</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
        contentContainerStyle={styles.chipContainer} // 내부 요소 정렬
      >
        {selectedAreas.map((area) => (
          <AreaChip
            key={area.id}
            text={area.name}
            onRemove={() => onRemoveArea(area.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    backgroundColor: '#F2F2F2',
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: '#2E2E31',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'SUIT Variable',
    lineHeight: 21,
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
