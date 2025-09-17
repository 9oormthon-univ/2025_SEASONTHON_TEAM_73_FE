import { REQUEST, userGet } from "@/shared/api";
import { LikedUser, LikedUserBaseRes } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

const fetchAllUser = async (page: number) => {
  const response = await userGet<LikedUserBaseRes<LikedUser[]>>({
    request: REQUEST.USER_LIKED,
    params: {
      page: page,
      size: 10,
    },
  });
  return response.data.data;
};

export const useFetchAllUser = (page: number) => {
  return useQuery({
    queryKey: ["allUser"],
    queryFn: () => fetchAllUser(page),
  });
};
