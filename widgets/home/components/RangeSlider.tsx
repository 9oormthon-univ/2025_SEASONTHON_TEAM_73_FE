import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
  ViewProps,
} from "react-native";

import { useLowHigh, useSelectedRail, useWidthLayout } from "../hooks";
import styles from "../styles";
import { clamp, getValueForPosition, isLowCloser } from "../utils";

const trueFunc = () => true;
const falseFunc = () => false;

export interface RangeSliderProps extends ViewProps {
  min: number;
  max: number;
  step: number;
  low?: number;
  high?: number;
  onValueChanged?: (low: number, high: number, byUser: boolean) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  low: lowProp,
  high: highProp,
  onValueChanged,
  ...restProps
}) => {
  const { inPropsRef, inPropsRefPrev, setLow, setHigh } = useLowHigh(
    lowProp,
    highProp,
    min,
    max,
    step
  );

  const lowThumbXRef = useRef(new Animated.Value(0));
  const highThumbXRef = useRef(new Animated.Value(0));
  const pointerX = useRef(new Animated.Value(0)).current;
  const { current: lowThumbX } = lowThumbXRef;
  const { current: highThumbX } = highThumbXRef;

  const gestureStateRef = useRef({
    isLow: true,
    lastValue: 0,
    lastPosition: 0,
  });

  const containerWidthRef = useRef(0);
  const [thumbWidth, setThumbWidth] = useState(24);

  const [selectedRailStyle, updateSelectedRail] = useSelectedRail(
    inPropsRef,
    containerWidthRef,
    thumbWidth
  );

  const updateThumbs = useCallback(() => {
    const { current: containerWidth } = containerWidthRef;
    if (!thumbWidth || !containerWidth) {
      return;
    }
    const { low, high } = inPropsRef.current;
    const { current: highThumbX } = highThumbXRef;
    const highPosition =
      ((high - min) / (max - min)) * (containerWidth - thumbWidth);
    highThumbX.setValue(highPosition);
    const { current: lowThumbX } = lowThumbXRef;
    const lowPosition =
      ((low - min) / (max - min)) * (containerWidth - thumbWidth);
    lowThumbX.setValue(lowPosition);
    updateSelectedRail();
  }, [inPropsRef, max, min, thumbWidth, updateSelectedRail]);

  useEffect(() => {
    const { low: lowPrev, high: highPrev } = inPropsRefPrev.current;
    if (
      (lowProp !== undefined && lowProp !== lowPrev) ||
      (highProp !== undefined && highProp !== highPrev)
    ) {
      updateThumbs();
    }
  }, [highProp, inPropsRefPrev, lowProp, updateThumbs]);

  useEffect(() => {
    updateThumbs();
  }, [updateThumbs]);

  const handleContainerLayout = useWidthLayout(containerWidthRef, updateThumbs);
  const handleThumbLayout = useCallback(
    ({ nativeEvent }: any) => {
      const {
        layout: { width },
      } = nativeEvent;
      if (thumbWidth !== width) {
        setThumbWidth(width);
      }
    },
    [thumbWidth]
  );

  const lowStyles = useMemo(() => {
    return [
      styles.lowThumbContainer,
      { transform: [{ translateX: lowThumbX }] },
    ];
  }, [lowThumbX]);

  const highStyles = useMemo(() => {
    return [
      styles.highThumbContainer,
      { transform: [{ translateX: highThumbX }] },
    ];
  }, [highThumbX]);

  const railContainerStyles = useMemo(() => {
    return [styles.railsContainer, { marginHorizontal: thumbWidth / 2 }];
  }, [thumbWidth]);

  const renderThumb = useCallback(() => {
    return <View style={styles.thumb} />;
  }, []);

  const renderRail = useCallback(() => {
    return <View style={styles.rail} />;
  }, []);

  const renderRailSelected = useCallback(() => {
    return <View style={styles.railSelected} />;
  }, []);

  const { panHandlers } = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponderCapture: falseFunc,
        onMoveShouldSetPanResponderCapture: falseFunc,
        onPanResponderTerminationRequest: falseFunc,
        onPanResponderTerminate: trueFunc,
        onShouldBlockNativeResponder: trueFunc,

        onMoveShouldSetPanResponder: (
          evt: GestureResponderEvent,
          gestureState: PanResponderGestureState
        ) => Math.abs(gestureState.dx) > 2 * Math.abs(gestureState.dy),

        onPanResponderGrant: ({ nativeEvent }, gestureState) => {
          const { numberActiveTouches } = gestureState;
          if (numberActiveTouches > 1) {
            return;
          }

          const { current: lowThumbX } = lowThumbXRef;
          const { current: highThumbX } = highThumbXRef;
          const { locationX: downX, pageX } = nativeEvent;
          const containerX = pageX - downX;

          const { low, high, min, max } = inPropsRef.current;
          const containerWidth = containerWidthRef.current;

          const lowPosition =
            thumbWidth / 2 +
            ((low - min) / (max - min)) * (containerWidth - thumbWidth);
          const highPosition =
            thumbWidth / 2 +
            ((high - min) / (max - min)) * (containerWidth - thumbWidth);

          const isLow = isLowCloser(downX, lowPosition, highPosition);
          gestureStateRef.current.isLow = isLow;

          const handlePositionChange = (positionInView: number) => {
            const { low, high, min, max, step } = inPropsRef.current;
            const minValue = isLow ? min : low;
            const maxValue = isLow ? high : max;
            const value = clamp(
              getValueForPosition(
                positionInView,
                containerWidth,
                thumbWidth,
                min,
                max,
                step
              ),
              minValue,
              maxValue
            );
            if (gestureStateRef.current.lastValue === value) {
              return;
            }
            const availableSpace = containerWidth - thumbWidth;
            const absolutePosition =
              ((value - min) / (max - min)) * availableSpace;
            gestureStateRef.current.lastValue = value;
            gestureStateRef.current.lastPosition =
              absolutePosition + thumbWidth / 2;
            (isLow ? lowThumbX : highThumbX).setValue(absolutePosition);
            onValueChanged?.(isLow ? value : low, isLow ? high : value, true);
            (isLow ? setLow : setHigh)(value);
            updateSelectedRail();
          };
          handlePositionChange(downX);
          pointerX.removeAllListeners();
          pointerX.addListener(({ value: pointerPosition }) => {
            const positionInView = pointerPosition - containerX;
            handlePositionChange(positionInView);
          });
        },

        onPanResponderMove: Animated.event([null, { moveX: pointerX }], {
          useNativeDriver: false,
        }),

        onPanResponderRelease: () => {},
      }),
    [
      inPropsRef,
      onValueChanged,
      pointerX,
      setHigh,
      setLow,
      thumbWidth,
      updateSelectedRail,
    ]
  );

  return (
    <View {...restProps}>
      <View onLayout={handleContainerLayout} style={styles.controlsContainer}>
        <View style={railContainerStyles}>
          {renderRail()}
          <Animated.View style={selectedRailStyle}>
            {renderRailSelected()}
          </Animated.View>
        </View>
        <Animated.View style={lowStyles} onLayout={handleThumbLayout}>
          {renderThumb()}
        </Animated.View>
        <Animated.View style={highStyles}>{renderThumb()}</Animated.View>
        <View
          {...panHandlers}
          style={styles.touchableArea}
          collapsable={false}
        />
      </View>
    </View>
  );
};

export default memo(RangeSlider);
