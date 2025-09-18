import { COLORS } from "@/shared/styles";
import { SplashImages, WelcomeText } from "@/widgets/loading/components";
import React from "react";
import { StyleSheet, View } from "react-native";

export const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <SplashImages />
      <WelcomeText />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
});

export default LoadingScreen;
