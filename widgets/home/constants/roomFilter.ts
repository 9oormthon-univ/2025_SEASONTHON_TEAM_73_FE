import { GENDER } from "@/shared/constants";
import {
  DEPOSIT_STEP,
  MAX_DEPOSIT,
  MAX_RENT,
  RENT_STEP,
  ROOM_TYPE,
} from "./filter";

export const DEPOSIT_FILTER = {
  key: "deposit" as const,
  title: "보증금",
  min: 0,
  max: MAX_DEPOSIT,
  step: DEPOSIT_STEP,
  unit: "만원",
} as const;

export const RENT_FILTER = {
  key: "rent" as const,
  title: "월세",
  min: 0,
  max: MAX_RENT,
  step: RENT_STEP,
  unit: "만원",
} as const;

export const ROOM_TYPE_FILTER = {
  key: "roomTypes" as const,
  title: "방 형태",
  options: Object.entries(ROOM_TYPE).map(([key, label]) => ({
    key,
    label,
    value: key,
  })),
  defaultText: "선택안함",
} as const;

export const GENDER_FILTER = {
  key: "preferredGender" as const,
  title: "성별",
  options: Object.entries(GENDER).map(([key, label]) => ({
    key,
    label,
    value: key,
  })),
  defaultText: "선택안함",
} as const;

export const ROOM_FILTER_FIELDS = {
  DEPOSIT: DEPOSIT_FILTER,
  RENT: RENT_FILTER,
  ROOM_TYPE: ROOM_TYPE_FILTER,
  GENDER: GENDER_FILTER,
} as const;

export type RoomFilterFieldKey = keyof typeof ROOM_FILTER_FIELDS;
export type DepositValue = [number, number];
export type RentValue = [number, number];
export type RoomTypeValue = string[];
export type GenderValue = string[];

export const getDepositDisplayValue = (value: DepositValue): string => {
  return `${value[0]}~${value[1]}만원`;
};

export const getRentDisplayValue = (value: RentValue): string => {
  return `${value[0]}~${value[1]}만원`;
};

export const getRoomTypeDisplayValue = (value: RoomTypeValue): string => {
  if (!value || value.length === 0) {
    return ROOM_TYPE_FILTER.defaultText;
  }
  return value
    .map((val) => ROOM_TYPE[val as keyof typeof ROOM_TYPE])
    .join(", ");
};

export const getGenderDisplayValue = (value: GenderValue): string => {
  if (!value || value.length === 0) {
    return GENDER_FILTER.defaultText;
  }
  return value.map((val) => GENDER[val as keyof typeof GENDER]).join(", ");
};

export const getRoomTypeSelectedIndices = (value: RoomTypeValue): number[] => {
  if (!value || value.length === 0) {
    return [];
  }
  return value
    .map((type) => Object.keys(ROOM_TYPE).indexOf(type))
    .filter((index) => index !== -1);
};

export const getGenderSelectedIndices = (value: GenderValue): number[] => {
  if (!value || value.length === 0) {
    return [];
  }
  return value.map((val) => Object.keys(GENDER).indexOf(val));
};
