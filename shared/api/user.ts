import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from "axios";
import Constants, { NativeConstants } from "expo-constants";
import { useAuthStore } from "../store";
import { BaseResponse } from "../types";
import { REQUEST } from "./request";

interface PostRequestParams<TData> {
  request: string;
  headers?: AxiosHeaders | { [key: string]: string };
  data?: TData;
}

interface GetRequestParams<TParams> {
  request: string;
  headers?: AxiosHeaders;
  params?: TParams;
}

const config = Constants as NativeConstants;
const { BACKEND_API_URL } = config.expoConfig!.extra!;

const instance = axios.create({
  baseURL: BACKEND_API_URL,
});

instance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  console.log(`${config.headers}를 요청 헤더로 보내요.`);
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        const response = await userPost<
          { refreshToken: string },
          BaseResponse<{ accessToken: string }>
        >({
          request: REQUEST.REFRESH,
          data: { refreshToken: useAuthStore.getState().refreshToken },
        });

        const { accessToken: newAccessToken } = response.data.data;

        if (typeof window !== "undefined") {
          useAuthStore.setState({ accessToken: newAccessToken });
        }

        const originalRequest = error.config as AxiosRequestConfig;

        if (originalRequest) {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
          return instance(originalRequest);
        }
      } catch {
        alert("토큰 갱신에 실패했어요.");
        useAuthStore.setState({ accessToken: "", refreshToken: "" });
      }
    }
    return Promise.reject(error);
  }
);

export async function userGet<TResponse, TParams = unknown>(
  config: GetRequestParams<TParams>
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, params } = config;

  console.log(`${request}로 요청을 보내요.`);
  console.log(`${params}를 요청 파라미터로 보내요.`);
  console.log(`${headers}를 요청 헤더로 보내요.`);

  try {
    const response = await instance.get<TResponse>(request, {
      params: params,
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) throw new Error(error.message);
    else throw new Error("에러가 발생했습니다");
  }
}

export async function userPost<TData, TResponse = unknown>(
  config: PostRequestParams<TData>
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, data } = config;

  console.log(`${request}로 요청을 보내요.`);
  console.log(`${data}를 요청 데이터로 보내요.`);
  console.log(`${headers}를 요청 헤더로 보내요.`);

  try {
    const response = await instance.post<
      TResponse,
      AxiosResponse<TResponse>,
      TData
    >(request, data, {
      headers: headers || undefined,
    });
    console.log(`${response.data}를 응답 데이터로 받았어요.`);
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    else throw new Error("에러가 발생했습니다");
  }
}

export async function userPut<TData, TResponse = unknown>(
  config: PostRequestParams<TData>
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, data } = config;

  console.log(`${request}로 요청을 보내요.`);
  console.log(`${data}를 요청 데이터로 보내요.`);
  console.log(`${headers}를 요청 헤더로 보내요.`);

  try {
    const response = await instance.put<
      TResponse,
      AxiosResponse<TResponse>,
      TData
    >(request, data, { headers: headers || undefined });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    else throw new Error("에러가 발생했습니다");
  }
}

export async function userDel<TResponse = unknown>(
  config: Omit<PostRequestParams<unknown>, "data">
): Promise<AxiosResponse<TResponse>> {
  const { request, headers } = config;

  console.log(`${request}로 요청을 보내요.`);
  console.log(`${headers}를 요청 헤더로 보내요.`);

  try {
    const response = await instance.delete<TResponse, AxiosResponse<TResponse>>(
      request,
      {
        headers: headers || undefined,
      }
    );
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    else throw new Error("에러가 발생했습니다");
  }
}

export async function userPatch<TData, TResponse = unknown>(
  config: PostRequestParams<TData>
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, data } = config;

  console.log(`${request}로 요청을 보내요.`);
  console.log(`${data}를 요청 데이터로 보내요.`);
  console.log(`${headers}를 요청 헤더로 보내요.`);

  try {
    const response = await instance.patch<
      TResponse,
      AxiosResponse<TResponse>,
      TData
    >(request, data, {
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    else throw new Error("에러가 발생했습니다");
  }
}
