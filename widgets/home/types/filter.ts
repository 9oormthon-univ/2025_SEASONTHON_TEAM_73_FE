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

export type RegionFilter = { dongs: string[] };
