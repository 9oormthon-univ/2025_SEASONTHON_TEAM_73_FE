export const GENDER = {
  MALE: "남성",
  FEMALE: "여성",
} as const;

export type Gender = keyof typeof GENDER;

export type GenderValue = (typeof GENDER)[keyof typeof GENDER];
