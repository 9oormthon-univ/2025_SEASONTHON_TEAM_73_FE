import { REQUEST, userPost } from "@/shared/api";
import { BaseResponse } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";

export type RecommendUser = {
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string;
    gender: string;
    age: number;
    smoking: boolean;
  };
  matchScore: number;
  reason: string;
};

type SubmitRecommendUserRes = BaseResponse<RecommendUser[]>;

const submitRecommendUser = async () => {
  const response = await userPost<unknown, SubmitRecommendUserRes>({
    request: REQUEST.USER_RECOMMEND,
  });
  return response.data.data;
};

export const useSubmitRecommendUser = () => {
  return useMutation({
    mutationFn: submitRecommendUser,
  });
};
