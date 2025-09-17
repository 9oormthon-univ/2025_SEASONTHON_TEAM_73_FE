import { Button } from "@/shared/components";
import { Gender } from "@/shared/constants";
import { COLORS, SPACING } from "@/shared/styles";
import { useDefaultFilter } from "@/widgets/home/contexts";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["84%"], []);

  const {
    minDeposit,
    maxDeposit,
    minMonthlyCost,
    maxMonthlyCost,
    roomTypes,
    setRoomTypes,
    preferredGender,
    setGenders,
    setDepositRange,
    setRentRange,
    selectedRegions,
    setSelectedRegions,
  } = useDefaultFilter();

  const [activeTab, setActiveTab] = useState<TabType>("preference");
  const [localDeposit, setLocalDeposit] = useState<[number, number]>([
    minDeposit,
    maxDeposit,
  ]);
  const [localRent, setLocalRent] = useState<[number, number]>([
    minMonthlyCost,
    maxMonthlyCost,
  ]);
  const [localRoomTypes, setLocalRoomTypes] = useState<string[]>(roomTypes);
  const [localGender, setLocalGender] = useState<string[]>(preferredGender);
  const [localSelectedRegions, setLocalSelectedRegions] =
    useState(selectedRegions);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isVisible]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const handleApply = () => {
    setDepositRange(localDeposit[0], localDeposit[1]);
    setRentRange(localRent[0], localRent[1]);
    setRoomTypes(localRoomTypes);
    setGenders(localGender as Gender[]);
    setSelectedRegions(localSelectedRegions);
    onClose();
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
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      onDismiss={onClose}
    >
      <BottomSheetView style={styles.contentContainer}>
        <TabHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "preference" && <PreferenceTab />}

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

        <View style={styles.buttonWrapper}>
          <Button size="lg" text="적용" onPress={handleApply} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handleIndicator: {
    backgroundColor: COLORS.gray[30],
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: SPACING.sm,
  },
  contentContainer: {
    flex: 1,
  },
  buttonWrapper: {
    paddingVertical: SPACING.lg,
    alignItems: "center",
    paddingHorizontal: SPACING.normal,
    marginBottom: SPACING.lg,
  },
});
