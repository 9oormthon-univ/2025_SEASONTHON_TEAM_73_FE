import axios from "axios";
import Constants, { NativeConstants } from "expo-constants";

const config = Constants as NativeConstants;
const { BACKEND_API_URL } = config.expoConfig!.extra!;

const api = axios.create({
  baseURL: BACKEND_API_URL,
  withCredentials: true,
});

// api.interceptors.request.use(async (config) => {
//   const { accessToken } = useAuthStore.getState();
//   if (accessToken) {
//     (config.headers as any) = {
//       ...config.headers,
//       Authorization: `Bearer ${accessToken}`,
//     };
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const { refreshToken } = useAuthStore.getState();
//         if (!refreshToken) throw new Error("No refresh token");

//         const res = await axios.post(`${BACKEND_API_URL}/auth/refresh`, {
//           refreshToken,
//         });

//         const newAccessToken = res.data.accessToken;
//         const newRefreshToken = res.data.refreshToken;

//         useAuthStore.setState({
//           accessToken: newAccessToken,
//           refreshToken: newRefreshToken,
//         });

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         useAuthStore.setState({ accessToken: "", refreshToken: "" });
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
