import { FILTERS } from "../constants";

export type PriceRange = {
  min: number;
  max: number;
};

export type DefaultFilter = {
  [FILTERS.DEPOSIT]: PriceRange;
  [FILTERS.RENT]: PriceRange;
  [FILTERS.ROOM_TYPE]: number[] | null;
  [FILTERS.GENDER]: number[] | null;
};

export type RegionFilter = any; // 나중에 백엔드 보고 타입 정의
