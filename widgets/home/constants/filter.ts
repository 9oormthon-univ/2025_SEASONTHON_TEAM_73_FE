export const MAX_DEPOSIT = 100;

export const MAX_RENT = 100;

export const FILTERS = {
  DEPOSIT: "deposit",
  RENT: "rent",
  REGION: "region",
  ROOM_TYPE: "roomType",
  GENDER: "gender",
} as const;

export const FILTER_DEFAULT = {
  [FILTERS.DEPOSIT]: {
    min: 0,
    max: MAX_DEPOSIT,
  },
  [FILTERS.RENT]: {
    min: 0,
    max: MAX_RENT,
  },
  [FILTERS.ROOM_TYPE]: null,
  [FILTERS.GENDER]: null,
};

export const ROOM_TYPE = ["원룸", "투룸", "오피스텔", "빌라", "아파트"];

export const GENDER = ["남성", "여성"];

export type FilterButtonType = (typeof FILTERS)[keyof typeof FILTERS];
