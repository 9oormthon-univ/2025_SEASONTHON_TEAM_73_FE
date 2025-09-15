import api from "@/shared/api/axios";
import { Alert } from "react-native";
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
      //console.error("좋아요 요청 실패", err);
      if (typeof err === "object" && err !== null && "response" in err && (err as any).response?.status === 400) {
        Alert.alert("자신에게는 좋아요를 누를 수 없습니다.");
      } else {
        Alert.alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  },
}));
