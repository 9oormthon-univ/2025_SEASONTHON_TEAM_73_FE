import { post } from "@/shared/api/method";
import { useAuthStore } from "@/shared/store";
import type { BaseResponse } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import { REQUEST } from "../../../shared/api/request";
import type { LoginFormData } from "../types";

type SubmitLoginResponse = BaseResponse<{
  accessToken: string;
  refreshToken: string;
}>;

const submitLogin = async (data: LoginFormData) => {
  const response = await post<LoginFormData, SubmitLoginResponse>({
    request: REQUEST.LOGIN,
    data,
  });
  return response.data.data;
};

export const useSubmitLogin = () => {
  return useMutation({
    mutationFn: submitLogin,
    onSuccess: ({ accessToken, refreshToken }) => {
      console.log(accessToken, refreshToken);
      useAuthStore.setState({
        isLoggedIn: true,
        accessToken,
        refreshToken,
      });
    },
  });
};
