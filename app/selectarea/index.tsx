import { Button } from '@/shared/components/Button/Button';
import { SPACING } from '@/shared/styles';
import { DescriptionSection } from '@/widgets/selectarea/DesciptionSection';
import { DistrictList } from '@/widgets/selectarea/DistrictList';
import { NeighborhoodList } from '@/widgets/selectarea/NeighborhoodList';
import { SelectedAreasSection } from '@/widgets/selectarea/SelectedAreasSection';
import { TabNavigation } from '@/widgets/selectarea/TabNavigation';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface SelectedArea {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
  isSelected: boolean;
}

interface Neighborhood {
  id: string;
  name: string;
  isSelected: boolean;
  districtId: string;
}

export default function Page() {
  const [selectedAreas, setSelectedAreas] = useState<SelectedArea[]>([]);
  const [districts, setDistricts] = useState<District[]>([
    { id: '1', name: '강남구', isSelected: false },
    { id: '2', name: '서초구', isSelected: false },
    { id: '3', name: '송파구', isSelected: false },
    { id: '4', name: '강동구', isSelected: false },
  ]);

  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([
    { id: '1', name: '논현동', isSelected: false, districtId: '1' },
    { id: '2', name: '역삼동', isSelected: false, districtId: '1' },
    { id: '3', name: '잠원동', isSelected: false, districtId: '2' },
    { id: '4', name: '반포동', isSelected: false, districtId: '2' },
    { id: '5', name: '잠실동', isSelected: false, districtId: '3' },
    { id: '6', name: '강동동', isSelected: false, districtId: '4' },
  ]);

  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);

  // 구 선택
  const handleSelectDistrict = (id: string) => {
    setDistricts(prev => prev.map(d => ({ ...d, isSelected: d.id === id })));
    setSelectedDistrictId(id); // 선택된 구 저장
  };

  // 동 선택
  const handleToggleNeighborhood = (id: string) => {
    setNeighborhoods(prev =>
      prev.map(n =>
        n.id === id ? { ...n, isSelected: !n.isSelected } : n
      )
    );

    setSelectedAreas(prev => {
      const clicked = neighborhoods.find(n => n.id === id);
      if (!clicked) return prev;

      if (prev.some(a => a.id === id)) {
        return prev.filter(a => a.id !== id);
      } else {
        return [...prev, { id: clicked.id, name: clicked.name }];
      }
    });
  };

  // 선택한 동 제거
  const handleRemoveArea = (id: string) => {
    setSelectedAreas(prev => prev.filter(a => a.id !== id));
    setNeighborhoods(prev =>
      prev.map(n => n.id === id ? { ...n, isSelected: false } : n)
    );
  };

  const handleApply = () => {
    console.log('Apply pressed', selectedAreas);
  };

  // 선택된 구의 동만 필터링
  const filteredNeighborhoods = neighborhoods.filter(
    n => n.districtId === selectedDistrictId
  );

  return (
    <View style={styles.container}>

        <DescriptionSection
            title="서울 자치구와 동을 선택해주세요."
            subtitle="최대 10개까지 선택 가능합니다."
        />

        <SelectedAreasSection
            selectedAreas={selectedAreas}
            onRemoveArea={handleRemoveArea}
        />

        <TabNavigation />

        <View style={styles.selectionContainer}>
            {/* 구 영역 */}
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <DistrictList districts={districts} onSelectDistrict={handleSelectDistrict} />
                </ScrollView>
            </View>

            {/* 동 영역 */}
            <View style={{ flex: 2 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <NeighborhoodList
                    neighborhoods={filteredNeighborhoods}
                    onToggleNeighborhood={handleToggleNeighborhood}
                />
                </ScrollView>
            </View>
        </View>

      <View
        style={{
          padding: SPACING.normal,
        }}
      >
        <Button
          size="lg"
          text="다음"
          onPress={handleApply}
          disabled={selectedAreas.length === 0 || selectedAreas.length > 10}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  selectionContainer: {
    flexDirection: 'row',
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#9D9D9F',
  },
});
