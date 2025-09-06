import { useAuthStore } from "@/shared/store";
import { BaseResponse } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import Constants, { NativeConstants } from "expo-constants";
import { REQUEST } from "../../../shared/api";

const config = Constants as NativeConstants;
const { BACKEND_API_URL } = config.expoConfig!.extra!;

const submitPost = async (data: any) => {
  console.log("submitPost 호출됨");

  const { accessToken } = useAuthStore.getState();
  console.log("accessToken:", accessToken ? "있음" : "없음");

  const url = `${BACKEND_API_URL}${REQUEST.POST_CREATE}`;
  console.log("요청 URL:", url);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  console.log("요청 헤더:", headers);
  console.log("전송 데이터:", data);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    console.log("fetch 성공, 응답 받음");
    console.log("응답 상태:", response.status);
    console.log("응답 상태 텍스트:", response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("응답 오류:", errorText);
      console.error("응답 상태:", response.status);
      console.error("응답 헤더:", response.headers);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const responseData: BaseResponse<number> = await response.json();
    console.log("응답 데이터:", responseData);

    return responseData.data;
  } catch (fetchError) {
    console.error("fetch 오류:", fetchError);
    throw fetchError;
  }
};

export const useSubmitPost = () => {
  return useMutation({
    mutationFn: submitPost,
  });
};
