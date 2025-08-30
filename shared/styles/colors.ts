export const COLORS = {
  primary: {
    100: "#5179F0",
    90: "#6287F2",
    80: "#7394F3",
    70: "#85A2F5",
    60: "#96AFF6",
    50: "#A7BCF7",
    40: "#B9C9F9",
    30: "#CAD6FA",
    20: "#DCE4FC",
    10: "#EDF1FD",
  },

  gray: {
    90: "#2E2E31",
    80: "#434347",
    70: "#5B5B5E",
    60: "#717173",
    50: "#878789",
    40: "#9D9D9F",
    30: "#B3B3B4",
    20: "#CBCBCB",
    10: "#E5E5E6",
    5: "#F2F2F2",
  },

  white: "#FCFCFC",
  black: "#17171B",
  transparent: "transparent",
  error: "#DE4725",
} as const;

export const colorUtils = {
  withOpacity: (color: string, opacity: number) => {
    return (
      color +
      Math.round(opacity * 255)
        .toString(16)
        .padStart(2, "0")
    );
  },
};
