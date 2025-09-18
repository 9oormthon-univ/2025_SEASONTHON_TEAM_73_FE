import { UserDefaultFilter } from "../types";

// Enum 값들 상수화
export const ALCOHOL_COUNT_VALUES = {
  ZERO: "ZERO",
  ONE_TO_THREE: "ONE_TO_THREE",
  MORE_THAN_FOUR: "MORE_THAN_FOUR",
  UNKNOWN: "UNKNOWN",
} as const;

export const SLEEP_LEVEL_VALUES = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  UNKNOWN: "UNKNOWN",
} as const;

export const TIDINESS_LEVEL_VALUES = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  UNKNOWN: "UNKNOWN",
} as const;

// 타입 정의
export type AlcoholCountValue =
  (typeof ALCOHOL_COUNT_VALUES)[keyof typeof ALCOHOL_COUNT_VALUES];
export type SleepLevelValue =
  (typeof SLEEP_LEVEL_VALUES)[keyof typeof SLEEP_LEVEL_VALUES];
export type TidinessLevelValue =
  (typeof TIDINESS_LEVEL_VALUES)[keyof typeof TIDINESS_LEVEL_VALUES];

export const USER_FILTER_FIELDS = {
  SMOKING: {
    key: "smoking" as keyof UserDefaultFilter,
    title: "흡연 여부",
    type: "toggle" as const,
  },
  ALCOHOL_COUNT: {
    key: "alcoholCount" as keyof UserDefaultFilter,
    title: "음주 빈도",
    type: "radio" as const,
    options: [
      { label: "0회", value: ALCOHOL_COUNT_VALUES.ZERO },
      { label: "주 1-3회", value: ALCOHOL_COUNT_VALUES.ONE_TO_THREE },
      { label: "주 4회 이상", value: ALCOHOL_COUNT_VALUES.MORE_THAN_FOUR },
    ],
  },
  SLEEP_LEVEL: {
    key: "sleepLevel" as keyof UserDefaultFilter,
    title: "수면 패턴",
    type: "radio" as const,
    options: [
      { label: "선택안함", value: undefined },
      { label: "낮음", value: SLEEP_LEVEL_VALUES.LOW },
      { label: "보통", value: SLEEP_LEVEL_VALUES.MEDIUM },
      { label: "높음", value: SLEEP_LEVEL_VALUES.HIGH },
    ],
  },
  PET: {
    key: "pet" as keyof UserDefaultFilter,
    title: "반려동물",
    type: "toggle" as const,
  },
  TIDINESS_LEVEL: {
    key: "tidinessLevel" as keyof UserDefaultFilter,
    title: "청결도",
    type: "radio" as const,
    options: [
      { label: "선택안함", value: undefined },
      { label: "낮음", value: TIDINESS_LEVEL_VALUES.LOW },
      { label: "보통", value: TIDINESS_LEVEL_VALUES.MEDIUM },
      { label: "높음", value: TIDINESS_LEVEL_VALUES.HIGH },
    ],
  },
} as const;

export const getFilterDisplayValue = (
  filter: UserDefaultFilter | null,
  key: keyof UserDefaultFilter
): string => {
  if (!filter) return "";

  switch (key) {
    case "smoking":
      return filter.smoking ? "흡연" : "비흡연";

    case "alcoholCount":
      if (filter.alcoholCount === ALCOHOL_COUNT_VALUES.ONE_TO_THREE)
        return "주 1-3회";
      if (filter.alcoholCount === ALCOHOL_COUNT_VALUES.MORE_THAN_FOUR)
        return "주 4회 이상";
      return "0회";

    case "sleepLevel":
      if (filter.sleepLevel === SLEEP_LEVEL_VALUES.LOW) return "낮음";
      if (filter.sleepLevel === SLEEP_LEVEL_VALUES.MEDIUM) return "보통";
      if (filter.sleepLevel === SLEEP_LEVEL_VALUES.HIGH) return "높음";
      return "선택안함";

    case "pet":
      return filter.pet && filter.pet.length > 0 ? "있음" : "없음";

    case "tidinessLevel":
      if (filter.tidinessLevel === TIDINESS_LEVEL_VALUES.LOW) return "낮음";
      if (filter.tidinessLevel === TIDINESS_LEVEL_VALUES.MEDIUM) return "보통";
      if (filter.tidinessLevel === TIDINESS_LEVEL_VALUES.HIGH) return "높음";
      return "선택안함";

    default:
      return "";
  }
};

// 라디오 버튼 선택 인덱스 계산
export const getRadioSelectedIndex = (
  filter: UserDefaultFilter | null,
  key: keyof UserDefaultFilter
): number => {
  if (!filter) return 0;

  switch (key) {
    case "alcoholCount":
      if (filter.alcoholCount === ALCOHOL_COUNT_VALUES.ONE_TO_THREE) return 1;
      if (filter.alcoholCount === ALCOHOL_COUNT_VALUES.MORE_THAN_FOUR) return 2;
      return 0;

    case "sleepLevel":
      if (filter.sleepLevel === SLEEP_LEVEL_VALUES.LOW) return 1;
      if (filter.sleepLevel === SLEEP_LEVEL_VALUES.MEDIUM) return 2;
      if (filter.sleepLevel === SLEEP_LEVEL_VALUES.HIGH) return 3;
      return 0;

    case "tidinessLevel":
      if (filter.tidinessLevel === TIDINESS_LEVEL_VALUES.LOW) return 1;
      if (filter.tidinessLevel === TIDINESS_LEVEL_VALUES.MEDIUM) return 2;
      if (filter.tidinessLevel === TIDINESS_LEVEL_VALUES.HIGH) return 3;
      return 0;

    default:
      return 0;
  }
};
