import { REQUEST, userGet } from "@/shared/api";
import type { LikedUser, LikedUserBaseRes } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

const fetchLikedUser = async (page: number) => {
  const response = await userGet<LikedUserBaseRes<LikedUser[]>>({
    request: REQUEST.USER_LIKED,
    params: {
      page: page,
      size: 10,
    },
  });
  return response.data.data;
};

export const useFetchLikedUser = (page: number) => {
  return useQuery({
    queryKey: ["likedUser", page],
    queryFn: () => fetchLikedUser(page),
  });
};
