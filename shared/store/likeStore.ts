import api from "@/shared/api/axios";
import { create } from "zustand";

interface LikeState {
  likedUsers: Record<number, boolean>; // { [userId]: true }
  toggleLike: (userId: number) => Promise<void>;
}

export const useLikeStore = create<LikeState>((set, get) => ({
  likedUsers: {},
  toggleLike: async (userId: number) => {
    const currentLiked = get().likedUsers[userId];

    try {
      if (currentLiked) {
        // 좋아요 취소 (DELETE)
        await api.delete(`/likes/${userId}`);
        set((state) => ({
          likedUsers: { ...state.likedUsers, [userId]: false },
        }));
      } else {
        // 좋아요 생성 (POST)
        await api.post(`/likes/${userId}`);
        set((state) => ({
          likedUsers: { ...state.likedUsers, [userId]: true },
        }));
      }
    } catch (err) {
      console.error("좋아요 요청 실패", err);
    }
  },
}));
