import { UserDefaultFilter } from "../types";

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
    title: "주 음주 횟수",
    type: "radio" as const,
    options: [
      { label: "0회", value: ALCOHOL_COUNT_VALUES.ZERO },
      { label: "주 1-3회", value: ALCOHOL_COUNT_VALUES.ONE_TO_THREE },
      { label: "주 4회 이상", value: ALCOHOL_COUNT_VALUES.MORE_THAN_FOUR },
    ],
  },
  SLEEP_LEVEL: {
    key: "sleepLevel" as keyof UserDefaultFilter,
    title: "잠귀 민감도",
    type: "radio" as const,
    options: [
      { label: "둔감해요", value: SLEEP_LEVEL_VALUES.LOW },
      { label: "보통이에요", value: SLEEP_LEVEL_VALUES.MEDIUM },
      { label: "예민한 편이에요", value: SLEEP_LEVEL_VALUES.HIGH },
    ],
  },
  PET: {
    key: "pet" as keyof UserDefaultFilter,
    title: "반려동물",
    type: "radio" as const,
    options: [
      { label: "강아지", value: "강아지" },
      { label: "고양이", value: "고양이" },
      { label: "새", value: "새" },
      { label: "물고기", value: "물고기" },
      { label: "기타", value: "기타" },
    ],
  },
  TIDINESS_LEVEL: {
    key: "tidinessLevel" as keyof UserDefaultFilter,
    title: "정리정돈 성향",
    type: "radio" as const,
    options: [
      { label: "항상 제자리에 둬요", value: TIDINESS_LEVEL_VALUES.LOW },
      { label: "대체로 정돈된 편이에요", value: TIDINESS_LEVEL_VALUES.MEDIUM },
      { label: "어지르는 편이에요", value: TIDINESS_LEVEL_VALUES.HIGH },
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
      if (!filter.alcoholCount || filter.alcoholCount.length === 0)
        return "선택안함";
      if (filter.alcoholCount.length === 1) {
        const alcoholValue = filter.alcoholCount[0];
        if (alcoholValue === ALCOHOL_COUNT_VALUES.ZERO) return "0회";
        if (alcoholValue === ALCOHOL_COUNT_VALUES.ONE_TO_THREE)
          return "주 1-3회";
        if (alcoholValue === ALCOHOL_COUNT_VALUES.MORE_THAN_FOUR)
          return "주 4회 이상";
      }
      return `${filter.alcoholCount.length}개 선택됨`;

    case "sleepLevel":
      if (!filter.sleepLevel || filter.sleepLevel.length === 0)
        return "선택안함";
      if (filter.sleepLevel.length === 1) {
        const sleepValue = filter.sleepLevel[0];
        if (sleepValue === SLEEP_LEVEL_VALUES.LOW) return "낮음";
        if (sleepValue === SLEEP_LEVEL_VALUES.MEDIUM) return "보통";
        if (sleepValue === SLEEP_LEVEL_VALUES.HIGH) return "높음";
      }
      return `${filter.sleepLevel.length}개 선택됨`;

    case "pet":
      if (!filter.pet || filter.pet.length === 0) return "선택안함";
      if (filter.pet.length === 1) {
        const petValue = filter.pet[0];
        if (petValue === "강아지") return "강아지";
        if (petValue === "고양이") return "고양이";
        if (petValue === "새") return "새";
        if (petValue === "물고기") return "물고기";
        if (petValue === "기타") return "기타";
      }
      return `${filter.pet.length}개 선택됨`;

    case "tidinessLevel":
      if (!filter.tidinessLevel || filter.tidinessLevel.length === 0)
        return "선택안함";
      if (filter.tidinessLevel.length === 1) {
        const tidinessValue = filter.tidinessLevel[0];
        if (tidinessValue === TIDINESS_LEVEL_VALUES.LOW) return "낮음";
        if (tidinessValue === TIDINESS_LEVEL_VALUES.MEDIUM) return "보통";
        if (tidinessValue === TIDINESS_LEVEL_VALUES.HIGH) return "높음";
      }
      return `${filter.tidinessLevel.length}개 선택됨`;

    default:
      return "";
  }
};

export const getRadioSelectedIndex = (
  filter: UserDefaultFilter | null,
  key: keyof UserDefaultFilter
): number => {
  if (!filter) return 0;

  switch (key) {
    case "alcoholCount":
      if (!filter.alcoholCount || filter.alcoholCount.length === 0) return 0;
      const alcoholValue = filter.alcoholCount[0];
      if (alcoholValue === ALCOHOL_COUNT_VALUES.ZERO) return 0;
      if (alcoholValue === ALCOHOL_COUNT_VALUES.ONE_TO_THREE) return 1;
      if (alcoholValue === ALCOHOL_COUNT_VALUES.MORE_THAN_FOUR) return 2;
      return 0;

    case "sleepLevel":
      if (!filter.sleepLevel || filter.sleepLevel.length === 0) return 0;
      const sleepValue = filter.sleepLevel[0];
      if (sleepValue === SLEEP_LEVEL_VALUES.LOW) return 0;
      if (sleepValue === SLEEP_LEVEL_VALUES.MEDIUM) return 1;
      if (sleepValue === SLEEP_LEVEL_VALUES.HIGH) return 2;
      return 0;

    case "pet":
      if (!filter.pet || filter.pet.length === 0) return 0;
      const petValue = filter.pet[0];
      if (petValue === "강아지") return 0;
      if (petValue === "고양이") return 1;
      if (petValue === "새") return 2;
      if (petValue === "물고기") return 3;
      if (petValue === "기타") return 4;
      return 0;

    case "tidinessLevel":
      if (!filter.tidinessLevel || filter.tidinessLevel.length === 0) return 0;
      const tidinessValue = filter.tidinessLevel[0];
      if (tidinessValue === TIDINESS_LEVEL_VALUES.LOW) return 0;
      if (tidinessValue === TIDINESS_LEVEL_VALUES.MEDIUM) return 1;
      if (tidinessValue === TIDINESS_LEVEL_VALUES.HIGH) return 2;
      return 0;

    default:
      return 0;
  }
};

export const getRadioSelectedIndices = (
  filter: UserDefaultFilter | null,
  key: keyof UserDefaultFilter
): number[] => {
  if (!filter) return [];

  switch (key) {
    case "alcoholCount":
      if (!filter.alcoholCount || filter.alcoholCount.length === 0) return [];
      return filter.alcoholCount
        .map((value) => {
          if (value === ALCOHOL_COUNT_VALUES.ZERO) return 0;
          if (value === ALCOHOL_COUNT_VALUES.ONE_TO_THREE) return 1;
          if (value === ALCOHOL_COUNT_VALUES.MORE_THAN_FOUR) return 2;
          return -1;
        })
        .filter((index) => index !== -1);

    case "sleepLevel":
      if (!filter.sleepLevel || filter.sleepLevel.length === 0) return [];
      return filter.sleepLevel
        .map((value) => {
          if (value === SLEEP_LEVEL_VALUES.LOW) return 0;
          if (value === SLEEP_LEVEL_VALUES.MEDIUM) return 1;
          if (value === SLEEP_LEVEL_VALUES.HIGH) return 2;
          return -1;
        })
        .filter((index) => index !== -1);

    case "pet":
      if (!filter.pet || filter.pet.length === 0) return [];
      return filter.pet
        .map((value) => {
          if (value === "강아지") return 0;
          if (value === "고양이") return 1;
          if (value === "새") return 2;
          if (value === "물고기") return 3;
          if (value === "기타") return 4;
          return -1;
        })
        .filter((index) => index !== -1);

    case "tidinessLevel":
      if (!filter.tidinessLevel || filter.tidinessLevel.length === 0) return [];
      return filter.tidinessLevel
        .map((value) => {
          if (value === TIDINESS_LEVEL_VALUES.LOW) return 0;
          if (value === TIDINESS_LEVEL_VALUES.MEDIUM) return 1;
          if (value === TIDINESS_LEVEL_VALUES.HIGH) return 2;
          return -1;
        })
        .filter((index) => index !== -1);

    default:
      return [];
  }
};
