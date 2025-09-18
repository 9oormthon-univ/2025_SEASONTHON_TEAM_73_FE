import { BottomSheet } from "@/shared/components";
import { Gender } from "@/shared/constants";
import { useDefaultFilter } from "@/widgets/home/contexts";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import PreferenceTab from "./PreferenceTab";
import RegionTab from "./RegionTab";
import RoomTypeTab from "./RoomTypeTab";
import TabHeader from "./TabHeader";

interface FilterBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

type TabType = "preference" | "roomType" | "region";

export default function FilterBottomSheet({
  isVisible,
  onClose,
}: FilterBottomSheetProps) {
  const {
    roomFilter,
    setRoomTypes,
    setGenders,
    setDepositRange,
    setRentRange,
    setSelectedRegions,
    userFilter,
    updateUserFilter,
  } = useDefaultFilter();

  const [activeTab, setActiveTab] = useState<TabType>("preference");
  const [localDeposit, setLocalDeposit] = useState<[number, number]>([
    roomFilter.minDeposit || 0,
    roomFilter.maxDeposit || 100000,
  ]);
  const [localRent, setLocalRent] = useState<[number, number]>([
    roomFilter.minMonthlyCost || 0,
    roomFilter.maxMonthlyCost || 100000,
  ]);
  const [localRoomTypes, setLocalRoomTypes] = useState<string[]>(
    roomFilter.roomTypes || []
  );
  const [localGender, setLocalGender] = useState<string[]>(
    roomFilter.preferredGender || []
  );
  const [localSelectedRegions, setLocalSelectedRegions] = useState(
    roomFilter.selectedRegions || []
  );
  const [localUserFilter, setLocalUserFilter] = useState(userFilter || {});

  const handleApply = () => {
    setDepositRange(localDeposit[0], localDeposit[1]);
    setRentRange(localRent[0], localRent[1]);
    setRoomTypes(localRoomTypes);
    setGenders(localGender as Gender[]);
    setSelectedRegions(localSelectedRegions);
    updateUserFilter(localUserFilter);
  };

  const handleDepositChange = useCallback(
    (depositMin: number, depositMax: number) => {
      setLocalDeposit([depositMin, depositMax]);
    },
    []
  );

  const handleRentChange = useCallback((rentMin: number, rentMax: number) => {
    setLocalRent([rentMin, rentMax]);
  }, []);

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      showButton={true}
      buttonText="적용"
      onButtonPress={handleApply}
      contentPadding={false}
    >
      <View style={styles.contentContainer}>
        <TabHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "preference" && (
          <PreferenceTab
            userFilter={localUserFilter}
            onFilterChange={(key, value) => {
              const newFilter = { ...localUserFilter };
              if (value === undefined) {
                delete newFilter[key as keyof typeof newFilter];
              } else {
                (newFilter as any)[key] = value;
              }
              setLocalUserFilter(newFilter);
            }}
          />
        )}

        {activeTab === "roomType" && (
          <RoomTypeTab
            localDeposit={localDeposit}
            localRent={localRent}
            localRoomTypes={localRoomTypes}
            localGender={localGender}
            onDepositChange={handleDepositChange}
            onRentChange={handleRentChange}
            onRoomTypeChange={setLocalRoomTypes}
            onGenderChange={setLocalGender}
          />
        )}

        {activeTab === "region" && (
          <RegionTab
            selectedRegions={localSelectedRegions}
            onRegionsChange={setLocalSelectedRegions}
          />
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
