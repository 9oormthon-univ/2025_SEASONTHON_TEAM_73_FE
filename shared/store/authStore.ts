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
