import { BasePaginationResponse } from "@/shared/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { REQUEST, userGet } from "../../../shared/api";
import { Room } from "../types";

const fetchPostList = async ({ pageParam = 0 }) => {
  const response = await userGet<BasePaginationResponse<Room[]>>({
    request: REQUEST.POST_LIST,
    params: {
      page: pageParam,
      size: 10,
    },
  });
  return response.data.data;
};

export const useFetchPostList = () => {
  return useInfiniteQuery({
    queryKey: ["postListInfinite"],
    queryFn: fetchPostList,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) {
        return undefined;
      }
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });
};
