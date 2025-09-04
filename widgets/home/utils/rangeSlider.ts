export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const getValueForPosition = (
  position: number,
  containerWidth: number,
  thumbWidth: number,
  min: number,
  max: number,
  step: number
): number => {
  const availableSpace = containerWidth - thumbWidth;
  const relativePosition = clamp(position - thumbWidth / 2, 0, availableSpace);
  const ratio = relativePosition / availableSpace;
  const rawValue = min + ratio * (max - min);
  const steppedValue = Math.round(rawValue / step) * step;
  return clamp(steppedValue, min, max);
};

export const isLowCloser = (
  downX: number,
  lowPosition: number,
  highPosition: number
): boolean => {
  const distanceToLow = Math.abs(downX - lowPosition);
  const distanceToHigh = Math.abs(downX - highPosition);
  return distanceToLow < distanceToHigh;
};
