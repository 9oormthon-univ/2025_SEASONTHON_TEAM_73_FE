import { useMemo } from "react";
import { DescriptionFormData } from "../types/post";

export const useDescriptionValidation = (formData: DescriptionFormData) => {
  const isFormValid = useMemo(() => {
    const { gender } = formData;

    return gender.length > 0;
  }, [formData]);

  return { isFormValid };
};
