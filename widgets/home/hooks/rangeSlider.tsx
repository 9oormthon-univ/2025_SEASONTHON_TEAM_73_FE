import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const useLowHigh = (
  lowProp?: number,
  highProp?: number,
  min: number = 0,
  max: number = 100,
  step: number = 1
) => {
  const [low, setLowState] = useState(lowProp ?? min);
  const [high, setHighState] = useState(highProp ?? max);

  const inPropsRef = useRef({
    low: lowProp ?? min,
    high: highProp ?? max,
    min,
    max,
    step,
  });

  const inPropsRefPrev = useRef({
    low: lowProp ?? min,
    high: highProp ?? max,
  });

  useEffect(() => {
    inPropsRef.current = {
      low: lowProp ?? low,
      high: highProp ?? high,
      min,
      max,
      step,
    };
  });

  useEffect(() => {
    inPropsRefPrev.current = {
      low: inPropsRef.current.low,
      high: inPropsRef.current.high,
    };
  });

  const setLow = useCallback((value: number) => {
    setLowState(value);
    inPropsRef.current.low = value;
  }, []);

  const setHigh = useCallback((value: number) => {
    setHighState(value);
    inPropsRef.current.high = value;
  }, []);

  return {
    inPropsRef,
    inPropsRefPrev,
    setLow,
    setHigh,
  };
};

export const useWidthLayout = (
  widthRef: MutableRefObject<number>,
  callback?: () => void
) => {
  return useCallback(
    (event: any) => {
      const { width } = event.nativeEvent.layout;
      const { current: currentWidth } = widthRef;
      if (currentWidth !== width) {
        widthRef.current = width;
        callback?.();
      }
    },
    [callback, widthRef]
  );
};

export const useSelectedRail = (
  inPropsRef: MutableRefObject<any>,
  containerWidthRef: MutableRefObject<number>,
  thumbWidth: number
) => {
  const [selectedRailStyle, setSelectedRailStyle] = useState({});

  const updateSelectedRail = useCallback(() => {
    const { low, high, min, max } = inPropsRef.current;
    const { current: containerWidth } = containerWidthRef;

    if (!thumbWidth || !containerWidth) {
      return;
    }

    const availableSpace = containerWidth - thumbWidth;
    const lowPosition = ((low - min) / (max - min)) * availableSpace;
    const highPosition = ((high - min) / (max - min)) * availableSpace;

    const leftPosition = lowPosition + thumbWidth / 2;
    const rightPosition = highPosition + thumbWidth / 2;

    const width = rightPosition - leftPosition;

    setSelectedRailStyle({
      position: "absolute" as const,
      left: leftPosition,
      width: Math.max(width, 0),
    });
  }, [inPropsRef, containerWidthRef, thumbWidth]);

  return [selectedRailStyle, updateSelectedRail] as const;
};
