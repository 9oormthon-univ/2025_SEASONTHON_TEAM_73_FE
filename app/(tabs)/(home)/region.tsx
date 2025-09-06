import { Button } from "@/shared/components/Button/Button";
import { SPACING } from "@/shared/styles";
import {
  District,
  Neighborhood,
  SEOUL_DISTRICTS,
  SEOUL_NEIGHBORHOODS,
} from "@/widgets/home/constants";
import { useDefaultFilter } from "@/widgets/home/contexts";
import {
  DescriptionSection,
  DistrictList,
  NeighborhoodList,
  SelectedAreasSection,
  TabNavigation,
} from "@/widgets/region";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface SelectedArea {
  id: string;
  name: string;
  districtId: string;
  districtName: string;
}

export default function Page() {
  const { setDongs, setSelectedRegions, selectedRegions } = useDefaultFilter();
  const [selectedAreas, setSelectedAreas] =
    useState<SelectedArea[]>(selectedRegions);
  const [districts, setDistricts] = useState<District[]>(SEOUL_DISTRICTS);

  const [neighborhoods, setNeighborhoods] =
    useState<Neighborhood[]>(SEOUL_NEIGHBORHOODS);

  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(
    null
  );

  // 이미 선택된 지역들에 대해 neighborhoods 상태 업데이트
  useEffect(() => {
    if (selectedRegions.length > 0) {
      setNeighborhoods((prev) =>
        prev.map((n) => ({
          ...n,
          isSelected: selectedRegions.some((region) => region.id === n.id),
        }))
      );
    }
  }, [selectedRegions]);

  const handleSelectDistrict = (id: string) => {
    setDistricts((prev) =>
      prev.map((d) => ({ ...d, isSelected: d.id === id }))
    );
    setSelectedDistrictId(id);
  };

  const handleToggleNeighborhood = (id: string) => {
    setNeighborhoods((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isSelected: !n.isSelected } : n))
    );

    setSelectedAreas((prev) => {
      const clicked = neighborhoods.find((n) => n.id === id);
      if (!clicked) return prev;

      if (prev.some((a) => a.id === id)) {
        return prev.filter((a) => a.id !== id);
      } else {
        const district = districts.find((d) => d.id === clicked.districtId);
        return [
          ...prev,
          {
            id: clicked.id,
            name: clicked.name,
            districtId: clicked.districtId,
            districtName: district?.name || "",
          },
        ];
      }
    });
  };

  const handleRemoveArea = (id: string) => {
    setSelectedAreas((prev) => prev.filter((a) => a.id !== id));
    setNeighborhoods((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isSelected: false } : n))
    );
  };

  const handleApply = () => {
    const dongNames = selectedAreas.map((area) => area.name);
    setDongs(dongNames);
    setSelectedRegions(selectedAreas);
    router.back();
    console.log("Apply pressed", selectedAreas);
    console.log("Dong names:", dongNames);
  };

  const filteredNeighborhoods = neighborhoods.filter(
    (n) => n.districtId === selectedDistrictId
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
            <DistrictList
              districts={districts}
              onSelectDistrict={handleSelectDistrict}
            />
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
    backgroundColor: "#FCFCFC",
  },
  selectionContainer: {
    flexDirection: "row",
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#9D9D9F",
  },
});
