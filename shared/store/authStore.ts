import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserToken {
  accessToken: string;
  refreshToken: string;
}

interface AuthState extends UserToken {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  setToken: (token: UserToken) => void;
  userName: string;
  userId: string;
  setUserName: (name: string) => void;
  setUserId: (id: string) => void;
  isRoom: boolean;
  isCertified: boolean;
  verified: boolean;
  nickname: string;
  setIsRoom: (isRoom: boolean) => void;
  setIsCertified: (isCertified: boolean) => void;
  setVerified: (verified: boolean) => void;
  setNickname: (nickname: string) => void;
  isPersonalitySurveyCompleted: boolean;
  setIsPersonalitySurveyCompleted: (
    isPersonalitySurveyCompleted: boolean
  ) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      login: () => set((state) => ({ ...state, isLoggedIn: true })),
      logout: () => {
        set(() => ({
          isLoggedIn: false,
          accessToken: "",
          refreshToken: "",
        }));
      },
      accessToken: "",
      refreshToken: "",
      setToken: ({ accessToken, refreshToken }) =>
        set((state) => ({
          ...state,
          accessToken: accessToken,
          refreshToken: refreshToken,
        })),
      userName: "",
      userId: "",
      setUserName: (name: string) => set(() => ({ userName: name })),
      setUserId: (id: string) => set(() => ({ userId: id })),
      isRoom: false,
      isCertified: false,
      verified: false,
      nickname: "",
      setIsRoom: (isRoom: boolean) => set(() => ({ isRoom: isRoom })),
      setIsCertified: (isCertified: boolean) =>
        set(() => ({ isCertified: isCertified })),
      setVerified: (verified: boolean) => set(() => ({ verified: verified })),
      setNickname: (nickname: string) => set(() => ({ nickname: nickname })),
      isPersonalitySurveyCompleted: false,
      setIsPersonalitySurveyCompleted: (
        isPersonalitySurveyCompleted: boolean
      ) =>
        set(() => ({
          isPersonalitySurveyCompleted: isPersonalitySurveyCompleted,
        })),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
