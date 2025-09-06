import { line } from "d3-shape";
import React, { useMemo } from "react";
import { Dimensions } from "react-native";
import { Path, Svg } from "react-native-svg";
import { SIZES } from "../constants";

const { NAVIGATION_BOTTOM_TABS_HEIGHT } = SIZES;

const { width: wWidth } = Dimensions.get("window");

interface Point {
  x: number;
  y: number;
}

interface TabsShapeProps {
  tabWidth: number;
}

const lineGenerator = line<Point>()
  .x((d: Point) => d.x)
  .y((d: Point) => d.y);

function TabsShape({ tabWidth }: TabsShapeProps) {
  const d = useMemo(() => {
    const straightPath = lineGenerator([
      { x: 0, y: 0 },
      { x: wWidth, y: 0 },
      { x: wWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
      { x: 0, y: NAVIGATION_BOTTOM_TABS_HEIGHT },
      { x: 0, y: 0 },
    ]);

    return straightPath;
  }, [tabWidth]);

  return (
    <Svg width={wWidth} {...{ height: NAVIGATION_BOTTOM_TABS_HEIGHT }}>
      <Path fill="white" {...{ d: d as string }} />
    </Svg>
  );
}

export default TabsShape;
