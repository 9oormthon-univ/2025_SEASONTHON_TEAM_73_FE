import api from "@/shared/api/axios";
import { Alert } from "react-native";
import { create } from "zustand";

interface LikeState {
  likedUsers: Record<number, boolean>;
  fetchLikes: () => Promise<void>;
  toggleLike: (userId: number) => Promise<void>;
  isLiked: (userId: number) => boolean; // ✅ 추가
}

export const useLikeStore = create<LikeState>((set, get) => ({
  likedUsers: {},

  // 좋아요 목록 불러오기
  fetchLikes: async () => {
    try {
      const res = await api.get("/likes", {
        params: { page: 0, size: 10000 },
      });

      const likedList = res.data?.data?.content ?? [];
      const likedMap: Record<number, boolean> = {};
      likedList.forEach((item: any) => {
        likedMap[item.id] = true;
        console.log(item);
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

  // ✅ userId가 좋아요 목록에 있는지 확인
  isLiked: (userId: number) => {
    if (!userId) return false;           // userId가 없으면 false
    return !!get().likedUsers[userId];   // 있으면 true, 없으면 false
  }
}));
