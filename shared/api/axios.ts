import axios from "axios";
import Constants, { NativeConstants } from "expo-constants";
import * as SecureStore from "expo-secure-store";

const config = Constants as NativeConstants;
const { BACKEND_API_URL } = config.expoConfig!.extra!;

const api = axios.create({
  baseURL: BACKEND_API_URL,
  withCredentials: true,
});

// 요청 인터셉터: accessToken 자동 추가
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) {
    (config.headers as any) = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// 응답 인터셉터: accessToken 만료 시 refresh 로 재발급
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized + retry 방지
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        // 새 토큰 요청
        const res = await axios.post(`${BACKEND_API_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        // 새 토큰 저장
        await SecureStore.setItemAsync("accessToken", newAccessToken);

        // 원래 요청에 새 토큰 추가 후 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // refreshToken 도 만료 → 로그아웃 처리 필요
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
