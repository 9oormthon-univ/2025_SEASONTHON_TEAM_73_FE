import { useMemo } from "react";
import { RoomInfoFormData } from "../types/post";

export const useRoomInfoValidation = (formData: RoomInfoFormData) => {
  const isFormValid = useMemo(() => {
    const {
      title,
      address,
      images,
      roomType,
      area,
      currentFloor,
      totalFloors,
      roomCount,
      bathroomCount,
      heatingType,
      hasElevator,
    } = formData;

    return (
      title.trim() !== "" &&
      address.trim() !== "" &&
      images.length > 0 &&
      roomType.length > 0 &&
      area.trim() !== "" &&
      currentFloor.trim() !== "" &&
      totalFloors.trim() !== "" &&
      roomCount.trim() !== "" &&
      bathroomCount.trim() !== "" &&
      heatingType.length > 0 &&
      hasElevator.length > 0
    );
  }, [formData]);

  return { isFormValid };
};
