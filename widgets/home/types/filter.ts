import { Gender } from "@/shared/constants";

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
  alcoholCount: "ZERO" | "ONE_TO_THREE" | "MORE_THAN_FOUR" | "UNKNOWN";
  sleepLevel: "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";
  pet: string[];
  tidinessLevel: "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";
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
