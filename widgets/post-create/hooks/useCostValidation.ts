import { useMemo } from "react";
import { CostFormData } from "../types/post";

export const useCostValidation = (formData: CostFormData) => {
  const isFormValid = useMemo(() => {
    const {
      deposit,
      monthlyRent,
      maintenanceFee,
      paymentStructure,
      moveInDate,
    } = formData;

    return (
      deposit.trim() !== "" &&
      monthlyRent.trim() !== "" &&
      maintenanceFee.trim() !== "" &&
      paymentStructure.length > 0 &&
      moveInDate !== null
    );
  }, [formData]);

  return { isFormValid };
};
