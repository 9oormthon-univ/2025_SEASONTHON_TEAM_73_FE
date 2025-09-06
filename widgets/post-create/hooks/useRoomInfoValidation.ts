import { useMemo } from "react";
import { RoomInfoFormData } from "../types/post";

export const useRoomInfoValidation = (formData: RoomInfoFormData) => {
  const isFormValid = useMemo(() => {
    const {
      title,
      location,
      images,
      roomType,
      areaSize,
      floor,
      buildingFloor,
      roomCount,
      washroomCount,
      heatingType,
      hasElevator,
    } = formData;

    console.log("Validation check:", {
      title: title.trim() !== "",
      location: location.trim() !== "",
      images: images.length > 0,
      roomType: !!roomType,
      areaSize: areaSize && areaSize > 0,
      floor: floor && floor > 0,
      buildingFloor: buildingFloor && buildingFloor > 0,
      roomCount: roomCount && roomCount > 0,
      washroomCount: washroomCount && washroomCount > 0,
      heatingType: heatingType === "CENTRAL",
      hasElevator: typeof hasElevator === "boolean",
    });

    return (
      title.trim() !== "" &&
      location.trim() !== "" &&
      images.length > 0 &&
      !!roomType &&
      areaSize &&
      areaSize > 0 &&
      floor &&
      floor > 0 &&
      buildingFloor &&
      buildingFloor > 0 &&
      roomCount &&
      roomCount > 0 &&
      washroomCount &&
      washroomCount > 0 &&
      heatingType === "CENTRAL" &&
      typeof hasElevator === "boolean"
    );
  }, [formData]);

  return { isFormValid };
};
