import { REQUEST, userGet } from "@/shared/api";
import { BaseResponse, UserProfile } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

type User = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
};

export type RecommendUser = User & {
  matchScore: number;
  gender: string;
  age: number;
  smoking: boolean;
};

type FetchDashboardResponse = BaseResponse<{
  recommendedUsers: {
    users: RecommendUser[];
  };
  likedUsers: {
    users: UserProfile[];
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
