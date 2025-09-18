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

export type DescriptionFormData = Partial<{
  content: string;
}>;

// PostCreateContext의 getCombinedData가 반환하는 최종 데이터 타입
export type CombinedPostData = {
  // RoomInfoFormData에서 온 필드들
  title: string;
  latitude: number;
  longitude: number;
  location: string;
  roomType: keyof typeof ROOM_TYPE;
  areaSize: number;
  floor: number;
  buildingFloor: number;
  roomCount: number;
  washroomCount: number;
  heatingType: "CENTRAL";
  hasElevator: boolean;
  images: string[];

  // CostFormData에서 온 필드들
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  depositShare: boolean;
  rentShare: boolean;
  maintenanceShare: boolean;
  utilitiesShare: boolean;
  availableDate: string;
  minStayMonths: number;
  maxStayMonths: number;
  preferredGender: Gender[];

  // DescriptionFormData에서 온 필드들
  content?: string;
};
