import {
  CostFormData,
  DescriptionFormData,
  RoomInfoFormData,
} from "../types/post";

export const ROOM_INFO_DEFAULT_VALUES: RoomInfoFormData = {
  title: "",
  latitude: 0,
  longitude: 0,
  location: "",
  images: [],
  roomType: "ONE_ROOM",
  areaSize: null,
  floor: null,
  buildingFloor: null,
  roomCount: null,
  washroomCount: null,
  heatingType: "CENTRAL",
  hasElevator: false,
};

export const COST_DEFAULT_VALUES: CostFormData = {
  deposit: null,
  monthlyRent: null,
  maintenanceFee: null,
  depositShare: false,
  rentShare: false,
  maintenanceShare: false,
  utilitiesShare: false,
  availableDate: "",
  minStayMonths: null,
  maxStayMonths: null,
  preferredGender: [],
};

export const DESCRIPTION_DEFAULT_VALUES: DescriptionFormData = {
  content: "",
};
