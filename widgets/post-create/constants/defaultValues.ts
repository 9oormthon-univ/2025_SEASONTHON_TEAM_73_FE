import {
  CostFormData,
  DescriptionFormData,
  RoomInfoFormData,
} from "../types/post";

export const ROOM_INFO_DEFAULT_VALUES: RoomInfoFormData = {
  title: "",
  address: "",
  images: [],
  roomType: [],
  area: "",
  currentFloor: "",
  totalFloors: "",
  roomCount: "",
  bathroomCount: "",
  heatingType: [],
  hasElevator: [],
};

export const COST_DEFAULT_VALUES: CostFormData = {
  deposit: "",
  monthlyRent: "",
  maintenanceFee: "",
  paymentStructure: [],
  moveInDate: null,
  minStayPeriod: "",
  maxStayPeriod: "",
};

export const DESCRIPTION_DEFAULT_VALUES: DescriptionFormData = {
  gender: [],
  description: "",
};
