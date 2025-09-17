import { COLORS, FONT_SIZE, FONTS, SPACING } from "@/shared/styles";
import {
  District,
  Neighborhood,
  SEOUL_DISTRICTS,
  SEOUL_NEIGHBORHOODS,
} from "@/widgets/home/constants";
import { SelectedRegion } from "@/widgets/home/types";
import { DescriptionSection } from "@/widgets/region";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface SelectedArea {
  id: string;
  name: string;
  districtId: string;
  districtName: string;
}

interface RegionTabProps {
  selectedRegions: SelectedRegion[];
  onRegionsChange: (regions: SelectedRegion[]) => void;
}

export default function RegionTab({
  selectedRegions,
  onRegionsChange,
}: RegionTabProps) {
  const [selectedAreas, setSelectedAreas] = useState<SelectedArea[]>(
    selectedRegions.map((region) => ({
      id: region.id,
      name: region.name,
      districtId: region.districtId,
      districtName: region.districtName,
    }))
  );
  const [districts, setDistricts] = useState<District[]>(SEOUL_DISTRICTS);
  const [neighborhoods, setNeighborhoods] =
    useState<Neighborhood[]>(SEOUL_NEIGHBORHOODS);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(
    null
  );

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

  // 부모 컴포넌트에 변경사항 전달
  useEffect(() => {
    onRegionsChange(selectedAreas);
  }, [selectedAreas, onRegionsChange]);

  const filteredNeighborhoods = neighborhoods.filter(
    (n) => n.districtId === selectedDistrictId
  );

  return (
    <View style={styles.container}>
      <DescriptionSection
        title="서울 자치구와 동을 선택해주세요."
        subtitle="최대 10개까지 선택 가능합니다."
      />

      {/* 선택된 지역들 표시 */}
      {selectedAreas.length > 0 && (
        <View style={styles.selectedAreasContainer}>
          <Text style={styles.selectedAreasTitle}>선택된 지역</Text>
          <View style={styles.selectedAreasList}>
            {selectedAreas.map((area) => (
              <View key={area.id} style={styles.selectedAreaChip}>
                <Text style={styles.selectedAreaText}>
                  {area.districtName} {area.name}
                </Text>
                <Text
                  style={styles.removeButton}
                  onPress={() => handleRemoveArea(area.id)}
                >
                  ✕
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 구/동 선택 영역 */}
      <View style={styles.selectionContainer}>
        {/* 구 영역 */}
        <View style={styles.districtContainer}>
          <Text style={styles.sectionTitle}>구</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {districts.map((district) => (
              <View
                key={district.id}
                style={[
                  styles.districtItem,
                  district.isSelected && styles.selectedItem,
                ]}
                onTouchEnd={() => handleSelectDistrict(district.id)}
              >
                <Text
                  style={[
                    styles.districtText,
                    district.isSelected && styles.selectedText,
                  ]}
                >
                  {district.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 동 영역 */}
        <View style={styles.neighborhoodContainer}>
          <Text style={styles.sectionTitle}>동</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedDistrictId ? (
              filteredNeighborhoods.map((neighborhood) => (
                <View
                  key={neighborhood.id}
                  style={[
                    styles.neighborhoodItem,
                    neighborhood.isSelected && styles.selectedItem,
                  ]}
                  onTouchEnd={() => handleToggleNeighborhood(neighborhood.id)}
                >
                  <Text
                    style={[
                      styles.neighborhoodText,
                      neighborhood.isSelected && styles.selectedText,
                    ]}
                  >
                    {neighborhood.name}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>
                  구를 먼저 선택해주세요
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: SPACING.normal,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
  },
  title: {
    fontFamily: FONTS.bold,
    includeFontPadding: false,
    fontSize: FONT_SIZE.b1,
  },
  description: {
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.bold,
    color: COLORS.primary[90],
  },
  selectedAreasContainer: {
    backgroundColor: COLORS.gray[5],
    paddingHorizontal: SPACING.normal,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
  },
  selectedAreasTitle: {
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.bold,
    color: COLORS.gray[70],
    marginBottom: SPACING.sm,
  },
  selectedAreasList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.xs,
  },
  selectedAreaChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary[90],
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    gap: SPACING.xs,
  },
  selectedAreaText: {
    fontSize: FONT_SIZE.c1,
    color: COLORS.white,
  },
  removeButton: {
    fontSize: FONT_SIZE.c1,
    color: COLORS.white,
    fontWeight: "bold",
  },
  selectionContainer: {
    flexDirection: "row",
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[10],
    maxHeight: 300,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
  },
  districtContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: COLORS.gray[10],
  },
  neighborhoodContainer: {
    flex: 2,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.c1,
    fontFamily: FONTS.bold,
    color: COLORS.gray[70],
    paddingHorizontal: SPACING.normal,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[10],
  },
  districtItem: {
    paddingHorizontal: SPACING.normal,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[5],
  },
  neighborhoodItem: {
    paddingHorizontal: SPACING.normal,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[5],
  },
  selectedItem: {
    backgroundColor: COLORS.primary[10],
  },
  districtText: {
    fontSize: FONT_SIZE.c1,
    color: COLORS.gray[70],
  },
  neighborhoodText: {
    fontSize: FONT_SIZE.c1,
    color: COLORS.gray[70],
  },
  selectedText: {
    color: COLORS.primary[90],
    fontFamily: FONTS.bold,
  },
  placeholderContainer: {
    paddingVertical: SPACING.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: FONT_SIZE.c1,
    color: COLORS.gray[50],
    textAlign: "center",
  },
});
