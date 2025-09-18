import { Gender } from "@/shared/constants";
import {
  AlcoholCountValue,
  SleepLevelValue,
  TidinessLevelValue,
} from "../constants/userFilter";

export type PriceRange = {
  min: number;
  max: number;
};

export type DefaultFilter = SearchFilter &
  RegionFilter & {
    minDeposit: number;
    maxDeposit: number;
    minMonthlyCost: number;
    maxMonthlyCost: number;
    roomTypes: string[];
    preferredGender: Gender[];
  };

export type SearchFilter = { keyword: string };

export type UserDefaultFilter = Partial<{
  smoking: boolean;
  alcoholCount: AlcoholCountValue[];
  sleepLevel: SleepLevelValue[];
  pet: string[];
  tidinessLevel: TidinessLevelValue[];
}>;

export interface SelectedRegion {
  id: string;
  name: string;
  districtId: string;
  districtName: string;
}

export type RegionFilter = {
  dongs: string[];
  selectedRegions: SelectedRegion[];
};
