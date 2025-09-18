import { BasePaginationResponse } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import { REQUEST, userPost } from "../../../shared/api";
import { DefaultFilter, Room } from "../types";

const submitPostSearch = async (roomFilter: Partial<DefaultFilter>) => {
  const response = await userPost<
    Partial<DefaultFilter>,
    BasePaginationResponse<Room[]>
  >({
    request: REQUEST.POST_SEARCH,
    data: roomFilter,
  });
  console.log(response.data.data);
  return response.data.data;
};

export const useSubmitPostSearch = () => {
  return useMutation({
    mutationFn: submitPostSearch,
  });
};
