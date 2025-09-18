import { post } from "@/shared/api/method";
import { useAuthStore } from "@/shared/store";
import { useLikeStore } from "@/shared/store/likeStore";
import type { BaseResponse } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { REQUEST } from "../../../shared/api/request";
import type { LoginFormData } from "../types";

type SubmitLoginResponse = BaseResponse<{
  accessToken: string;
  refreshToken: string;
  userId: number;
  isRoom: boolean;
  isCertified: boolean;
  verified: boolean;
  nickname: string;
  isPersonalitySurveyCompleted: boolean;
}>;

const submitLogin = async (data: LoginFormData) => {
  const response = await post<LoginFormData, SubmitLoginResponse>({
    request: REQUEST.LOGIN,
    data,
  });
  return response.data.data;
};

export const useSubmitLogin = () => {
  const fetchLikes = useLikeStore((state) => state.fetchLikes);

  return useMutation({
    mutationFn: submitLogin,
    onError: (error) => {
      Alert.alert(error.message);
    },
    onSuccess: ({
      accessToken,
      refreshToken,
      userId,
      isRoom,
      isCertified,
      verified,
      nickname,
      isPersonalitySurveyCompleted,
    }) => {
      console.log(accessToken, refreshToken, userId);
      useAuthStore.setState({
        isLoggedIn: true,
        accessToken,
        refreshToken,
        userId: userId.toString(),
        isRoom,
        isCertified,
        verified,
        nickname,
        isPersonalitySurveyCompleted,
      });
      fetchLikes();
    },
  });
};
