import api from "@/shared/api/axios";
import { Alert } from "react-native";
import { create } from "zustand";

interface LikeState {
  likedUsers: Record<number, boolean>;
  fetchLikes: () => Promise<void>;
  toggleLike: (userId: number) => Promise<void>;
}

export const useLikeStore = create<LikeState>((set, get) => ({
  likedUsers: {},

  // ✅ 서버에서 좋아요 목록 불러오기
  fetchLikes: async () => {
    try {
      const res = await api.get("/likes", {
        params: { page: 0, size: 10000 }, // 페이지 크게 설정
      });

      const likedList = res.data?.data?.content ?? [];
      // likedUsers 형태로 변환 { [likedUserId]: true }
      const likedMap: Record<number, boolean> = {};
      likedList.forEach((item: any) => {
        likedMap[item.likedUserId] = true;
      });

      set({ likedUsers: likedMap });
    } catch (err) {
      console.error("좋아요 목록 불러오기 실패", err);
    }
  },

  toggleLike: async (userId: number) => {
    const currentLiked = get().likedUsers[userId];

    try {
      if (currentLiked) {
        await api.delete(`/likes/${userId}`);
        set((state) => ({
          likedUsers: { ...state.likedUsers, [userId]: false },
        }));
      } else {
        await api.post(`/likes/${userId}`);
        set((state) => ({
          likedUsers: { ...state.likedUsers, [userId]: true },
        }));
      }
    } catch (err) {
      if (typeof err === "object" && err !== null && "response" in err && (err as any).response?.status === 400) {
        Alert.alert("자신에게는 좋아요를 누를 수 없습니다.");
      } else {
        Alert.alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  },
}));
