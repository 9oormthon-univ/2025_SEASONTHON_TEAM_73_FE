import { Button } from "@/shared/components";
import { COLORS, SPACING } from "@/shared/styles";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { StyleSheet, View } from "react-native";

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  snapPoints?: string[];
  showButton?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
  buttonSize?: "sm" | "md" | "lg";
  contentPadding?: boolean;
}

export default function BottomSheet({
  isVisible,
  onClose,
  children,
  snapPoints = ["84%"],
  showButton = false,
  buttonText = "적용",
  onButtonPress,
  buttonSize = "lg",
  contentPadding = true,
}: BottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

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

  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    }
    onClose();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={memoizedSnapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      onDismiss={onClose}
    >
      <BottomSheetView
        style={[
          styles.contentContainer,
          contentPadding && styles.contentPadding,
        ]}
      >
        {children}

        {showButton && (
          <View style={styles.buttonWrapper}>
            <Button
              size={buttonSize}
              text={buttonText}
              onPress={handleButtonPress}
            />
          </View>
        )}
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
  contentPadding: {
    paddingHorizontal: SPACING.normal,
  },
  buttonWrapper: {
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.normal,
    paddingBottom: SPACING.xxl,
  },
});
