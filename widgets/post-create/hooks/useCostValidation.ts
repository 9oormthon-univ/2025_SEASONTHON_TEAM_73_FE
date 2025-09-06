import { useMemo } from "react";
import { CostFormData } from "../types/post";

export const useCostValidation = (formData: CostFormData) => {
  const isFormValid = useMemo(() => {
    const {
      deposit,
      monthlyRent,
      maintenanceFee,
      depositShare,
      rentShare,
      maintenanceShare,
      utilitiesShare,
      availableDate,
      preferredGender,
    } = formData;

    const hasPaymentStructure =
      depositShare || rentShare || maintenanceShare || utilitiesShare;

    return (
      deposit &&
      monthlyRent &&
      monthlyRent > 0 &&
      maintenanceFee &&
      maintenanceFee > 0 &&
      hasPaymentStructure &&
      availableDate !== null &&
      availableDate !== "" &&
      preferredGender.length > 0
    );
  }, [formData]);

  return { isFormValid };
};
