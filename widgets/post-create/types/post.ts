export type RoomInfoFormData = {
  title: string;
  address: string;
  images: string[];
  roomType: number[];
  area: string;
  currentFloor: string;
  totalFloors: string;
  roomCount: string;
  bathroomCount: string;
  heatingType: number[];
  hasElevator: number[];
};

export type CostFormData = {
  deposit: string;
  monthlyRent: string;
  maintenanceFee: string;
  paymentStructure: number[];
  moveInDate: Date | null;
  minStayPeriod: string;
  maxStayPeriod: string;
};

export type DescriptionFormData = {
  gender: number[];
  description: string;
};

export type PostCreateFormData = {
  roomInfo: RoomInfoFormData;
  cost: CostFormData;
  description: DescriptionFormData;
};
