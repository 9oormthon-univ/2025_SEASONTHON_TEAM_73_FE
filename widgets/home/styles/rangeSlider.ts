import { COLORS } from "@/shared/styles";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  railsContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  rail: {
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray[20],
  },
  railSelected: {
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary[90],
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray[20],
  },
  lowThumbContainer: {
    position: "absolute",
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  highThumbContainer: {
    position: "absolute",
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableArea: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -10,
    bottom: -10,
  },
});
