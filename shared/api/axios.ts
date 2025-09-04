import axios from "axios";
import Constants, { NativeConstants } from "expo-constants";

const config = Constants as NativeConstants;
const { BACKEND_API_URL } = config.expoConfig!.extra!;

const api = axios.create({
  baseURL: BACKEND_API_URL,
});

// 요청 인터셉터에서 토큰 자동 추가
// api.interceptors.request.use(async (config) => {
//   const token = await SecureStore.getItemAsync("accessToken"); // 저장해둔 토큰
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
