import React, { createContext, ReactNode, useContext, useState } from "react";
import type {
  CostFormData,
  DescriptionFormData,
  RoomInfoFormData,
} from "../types/post";

interface PostCreateContextType {
  // 데이터
  roomInfo: RoomInfoFormData | null;
  cost: CostFormData | null;
  description: DescriptionFormData | null;

  // 액션
  setRoomInfo: (data: RoomInfoFormData) => void;
  setCost: (data: CostFormData) => void;
  setDescription: (data: DescriptionFormData) => void;

  // 유틸리티
  clearAll: () => void;
  getCombinedData: (descriptionData?: DescriptionFormData) => any;
}

const PostCreateContext = createContext<PostCreateContextType | undefined>(
  undefined
);

interface PostCreateProviderProps {
  children: ReactNode;
}

export const PostCreateProvider: React.FC<PostCreateProviderProps> = ({
  children,
}) => {
  const [roomInfo, setRoomInfo] = useState<RoomInfoFormData | null>(null);
  const [cost, setCost] = useState<CostFormData | null>(null);
  const [description, setDescription] = useState<DescriptionFormData | null>(
    null
  );

  const clearAll = () => {
    setRoomInfo(null);
    setCost(null);
    setDescription(null);
  };

  const getCombinedData = (descriptionData?: DescriptionFormData) => {
    const currentDescription = descriptionData || description;

    if (!roomInfo || !cost || !currentDescription) {
      console.log("getCombinedData: 데이터 누락", {
        roomInfo: !!roomInfo,
        cost: !!cost,
        description: !!currentDescription,
      });
      return null;
    }

    const { images, ...roomInfoWithoutImages } = roomInfo;

    const sanitizedRoomInfo = {
      ...roomInfoWithoutImages,
      areaSize: roomInfoWithoutImages.areaSize ?? 0,
      floor: roomInfoWithoutImages.floor ?? 1,
      buildingFloor: roomInfoWithoutImages.buildingFloor ?? 1,
      roomCount: roomInfoWithoutImages.roomCount ?? 1,
      washroomCount: roomInfoWithoutImages.washroomCount ?? 1,
    };

    const sanitizedCost = {
      ...cost,
      deposit: cost.deposit ?? 0,
      monthlyRent: cost.monthlyRent ?? 0,
      maintenanceFee: cost.maintenanceFee ?? 0,
      minStayMonths: cost.minStayMonths ?? 1,
      maxStayMonths: cost.maxStayMonths ?? 12,
    };

    const result = {
      ...sanitizedRoomInfo,
      ...sanitizedCost,
      ...currentDescription,
      images, // 이미지는 별도로 처리
    };

    console.log("getCombinedData result:", result);
    return result;
  };

  const value: PostCreateContextType = {
    roomInfo,
    cost,
    description,
    setRoomInfo,
    setCost,
    setDescription,
    clearAll,
    getCombinedData,
  };

  return (
    <PostCreateContext.Provider value={value}>
      {children}
    </PostCreateContext.Provider>
  );
};

export const usePostCreate = (): PostCreateContextType => {
  const context = useContext(PostCreateContext);
  if (context === undefined) {
    throw new Error("usePostCreate must be used within a PostCreateProvider");
  }
  return context;
};
