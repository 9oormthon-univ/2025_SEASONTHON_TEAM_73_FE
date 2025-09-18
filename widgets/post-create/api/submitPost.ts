import { REQUEST, userPost } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import type { CombinedPostData } from "../types/post";

const submitPost = async (formData: CombinedPostData) => {
  const response = await userPost<CombinedPostData, number>({
    request: REQUEST.POST_CREATE,
    data: formData,
  });
  return response.data;
};

export const useSubmitPost = () => {
  return useMutation({
    mutationFn: submitPost,
  });
};
