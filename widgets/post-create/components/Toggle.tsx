import { COLORS } from "@/shared/styles";
import React, { useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

interface ToggleProps {
  initialValue?: boolean;
  onToggle?: (value: boolean) => void;
  disabled?: boolean;
}

function Toggle({
  initialValue = false,
  onToggle,
  disabled = false,
}: ToggleProps) {
  const [isToggled, setIsToggled] = useState(initialValue);
  const animatedValue = useRef(
    new Animated.Value(initialValue ? 1 : 0)
  ).current;

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !isToggled;
    setIsToggled(newValue);

    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    onToggle?.(newValue);
  };

  const toggleButtonLeft = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#CBCBCB", COLORS.primary[90]],
  });

  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={handleToggle}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              left: toggleButtonLeft,
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 28,
  },
  track: {
    width: 52,
    height: 28,
    paddingTop: 2,
    paddingRight: 26,
    paddingBottom: 2,
    paddingLeft: 2,
    alignItems: "center",
    borderRadius: 20,
    position: "relative",
    backgroundColor: "#CBCBCB",
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: "absolute",
    top: 2,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Toggle;
