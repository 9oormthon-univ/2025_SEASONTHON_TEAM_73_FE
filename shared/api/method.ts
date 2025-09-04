import axios, { isAxiosError, type AxiosResponse } from "axios";
import Constants, { NativeConstants } from "expo-constants";

interface PostRequestParams<TData> {
  request: string;
  headers?: { [key: string]: string };
  data?: TData;
}

interface GetRequestParams<TParams> {
  request: string;
  headers?: { [key: string]: string };
  params?: TParams;
}

const config = Constants as NativeConstants;
const { BACKEND_API_URL } = config.expoConfig!.extra!;

const instance = axios.create({
  baseURL: BACKEND_API_URL,
});

export async function get<TResponse, TParams = unknown>(
  config: GetRequestParams<TParams>
): Promise<AxiosResponse<TResponse>> {
  const { request, headers, params } = config;

  console.log(`${request}로 요청을 보내요.`);
  console.log(`${params}를 요청 파라미터로 보내요.`);
  console.log(`${headers}를 요청 헤더로 보내요.`);

  try {
    const response = await instance.get<TResponse>(request, {
      withCredentials: true,
      params: params,
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    else throw new Error("에러가 발생했습니다");
  }
}

export async function post<TData, TResponse = unknown>(
  config: PostRequestParams<TData>
): Promise<AxiosResponse<TResponse>> {
  const { request, data, headers } = config;

  console.log(`${request}로 요청을 보내요.`);
  console.log(`${data}를 요청 데이터로 보내요.`);
  console.log(`${headers}를 요청 헤더로 보내요.`);

  try {
    const response = await instance.post<
      TResponse,
      AxiosResponse<TResponse>,
      TData
    >(request, data, {
      withCredentials: true,
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    else throw new Error("에러가 발생했습니다");
  }
}

export async function del<TData, TResponse = unknown>(
  config: PostRequestParams<TData>
): Promise<AxiosResponse<TResponse>> {
  const { request, headers } = config;

  console.log(`${request}로 요청을 보내요.`);
  console.log(`${headers}를 요청 헤더로 보내요.`);

  try {
    const response = await instance.delete(`${request}`, {
      headers: headers || undefined,
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) throw new Error(error.response?.data.message);
    else throw new Error("에러가 발생했습니다");
  }
}
