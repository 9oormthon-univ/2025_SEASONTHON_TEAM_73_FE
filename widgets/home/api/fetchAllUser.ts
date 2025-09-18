import { REQUEST, userGet } from "@/shared/api";
import { DEFAULT_PAGE_SIZE } from "@/shared/constants";
import { LikedUserBaseRes, UserProfile } from "@/shared/types";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchAllUser = async (page: number) => {
  const response = await userGet<LikedUserBaseRes<UserProfile[]>>({
    request: REQUEST.USER_ALL,
    params: {
      page: page,
      size: DEFAULT_PAGE_SIZE,
    },
  });
  return response.data.data;
};

export const useFetchAllUser = () => {
  return useInfiniteQuery({
    queryKey: ["allUser"],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      fetchAllUser(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.content.length < DEFAULT_PAGE_SIZE) {
        return undefined;
      }
      return allPages.length;
    },
    initialPageParam: 0,
  });
};
