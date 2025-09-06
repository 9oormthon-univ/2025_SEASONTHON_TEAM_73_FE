import { Gender } from "@/shared/constants";
import { ROOM_TYPE } from "@/widgets/home/constants";

export type ImageFile = {
  imageFile: string;
};

export type RoomInfoFormData = {
  title: string;
  latitude: number;
  longitude: number;
  location: string;
  images: string[];
  roomType: keyof typeof ROOM_TYPE;
  areaSize: number | null;
  floor: number | null;
  buildingFloor: number | null;
  roomCount: number | null;
  washroomCount: number | null;
  heatingType: "CENTRAL";
  hasElevator: boolean;
};

export type CostFormData = {
  deposit: number | null;
  monthlyRent: number | null;
  maintenanceFee: number | null;
  depositShare: boolean;
  rentShare: boolean;
  maintenanceShare: boolean;
  utilitiesShare: boolean;
  availableDate: string;
  minStayMonths: number | null;
  maxStayMonths: number | null;
  preferredGender: Gender[];
};

export type DescriptionFormData = {
  content: string;
};
