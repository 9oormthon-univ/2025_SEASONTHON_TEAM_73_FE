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
      // 마지막 페이지인지 확인
      if (lastPage.last) {
        return undefined;
      }
      // 다음 페이지 번호 반환
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });
};
