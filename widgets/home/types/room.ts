import type { Gender } from "@/shared/constants";

export type Room = {
  id: number;
  title: string;
  imageUrl: string;
  region: string;
  availableDate: string;
  roomType: string;
  deposit: number;
  monthlyRent: number;
  gender: Gender;
};
