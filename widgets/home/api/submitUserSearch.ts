import { DEFAULT_PAGE_SIZE } from "@/shared/constants";
import type { BasePaginationResponse, UserProfile } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import { REQUEST, userPost } from "../../../shared/api";
import type { UserDefaultFilter } from "../types";

const submitUserSearch = async ({
  filters,
  page,
}: {
  filters: UserDefaultFilter;
  page: number;
}) => {
  const response = await userPost<
    UserDefaultFilter,
    BasePaginationResponse<UserProfile[]>
  >({
    request: REQUEST.USER_SEARCH + `?page=${page}&size=${DEFAULT_PAGE_SIZE}`,
    data: filters,
  });
  console.log(response.data.data);
  return response.data.data;
};

export const useSubmitUserSearch = () => {
  return useMutation({
    mutationFn: submitUserSearch,
  });
};
