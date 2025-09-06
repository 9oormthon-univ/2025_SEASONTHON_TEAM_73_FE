// Skeleton.tsx
import { COLORS } from "@/shared/styles";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";

type SkeletonProps = {
  width?: number;
  height?: number;
  radius?: number;
  style?: ViewStyle;
  light?: string;
  dark?: string;
  duration?: number;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 16,
  radius = 8,
  style,
  light = COLORS.gray[10],
  dark = COLORS.gray[30],
  duration = 1200,
}) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, duration]);

  // opacity로만 애니메이션 (useNativeDriver 적용 가능)
  const opacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <Animated.View
      style={[
        styles.base,
        {
          width: width as number,
          height: height as number,
          borderRadius: radius,
          backgroundColor: light,
          opacity,
        },
        style,
      ]}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: dark, opacity: 0.18, borderRadius: radius },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
  },
});
