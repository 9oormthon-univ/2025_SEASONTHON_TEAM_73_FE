import { REQUEST, userGet } from "@/shared/api";
import { BaseResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export type User = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
};

export type LikedUser = User & {
  gender: string;
  age: number;
  smoking: boolean;
};

type FetchDashboardResponse = BaseResponse<{
  recommendedUsers: {
    users: User[];
  };
  likedUsers: {
    users: LikedUser[];
  };
  isPersonalitySurveyCompleted: boolean;
}>;

const fetchDashboard = async (hasRoom: boolean) => {
  const response = await userGet<FetchDashboardResponse>({
    request: hasRoom ? REQUEST.DASHBOARD_ROOM : REQUEST.DASHBOARD_NOROOM,
  });

  return response.data.data;
};

export const useFetchDashboard = (hasRoom: boolean) => {
  return useQuery({
    queryKey: ["dashboard", hasRoom],
    queryFn: () => fetchDashboard(hasRoom),
  });
};
