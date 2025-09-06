export const MAX_DEPOSIT = 20000;

export const DEPOSIT_STEP = 100;

export const MAX_RENT = 200;

export const RENT_STEP = 10;

export const FILTERS = {
  DEPOSIT: "Deposit",
  RENT: "MonthlyCost",
  REGION: "dongs",
  ROOM_TYPE: "roomTypes",
  GENDER: "preferredGender",
} as const;

export const FILTER_DEFAULT = {
  minDeposit: 0,
  maxDeposit: MAX_DEPOSIT,
  minMonthlyCost: 0,
  maxMonthlyCost: MAX_RENT,
  roomTypes: [],
  preferredGender: [],
  keyword: "",
  dongs: [],
};

export const ROOM_TYPE = {
  ONE_ROOM: "원룸",
  TWO_ROOM: "투룸",
  VILLA: "빌라",
  OFFICETEL: "오피스텔",
  APARTMENT: "아파트",
} as const;

export const ROOM_TYPE_KEYS = Object.keys(
  ROOM_TYPE
) as (keyof typeof ROOM_TYPE)[];

export const GENDER = ["남성", "여성"];

export type FilterButtonType = (typeof FILTERS)[keyof typeof FILTERS];
