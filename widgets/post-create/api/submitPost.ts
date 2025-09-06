import { useAuthStore } from "@/shared/store";
import { BaseResponse } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import Constants, { NativeConstants } from "expo-constants";
import { REQUEST } from "../../../shared/api";

const config = Constants as NativeConstants;
const { BACKEND_API_URL } = config.expoConfig!.extra!;

const submitPost = async (formData: FormData) => {
  console.log("submitPost 호출됨");

  const { accessToken } = useAuthStore.getState();
  console.log("accessToken:", accessToken ? "있음" : "없음");

  const url = `${BACKEND_API_URL}${REQUEST.POST_CREATE}`;
  console.log("요청 URL:", url);

  const headers: HeadersInit = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  // FormData 사용 시 Content-Type을 명시적으로 설정하지 않음
  // 브라우저가 자동으로 multipart/form-data로 설정하도록 함

  console.log("FormData 전송 중...");

  // FormData 내용 확인
  try {
    console.log("FormData 내용:");
    // React Native에서는 entries() 메서드가 지원되지 않을 수 있음
    if (typeof (formData as any).entries === "function") {
      for (let [key, value] of (formData as any).entries()) {
        if (value instanceof File) {
          console.log(
            `${key}: File - ${value.name}, size: ${value.size}, type: ${value.type}`
          );
        } else {
          console.log(`${key}:`, typeof value, value);
        }
      }
    } else {
      console.log("FormData entries 메서드를 사용할 수 없습니다.");
    }
  } catch (e) {
    console.log("FormData entries 확인 중 오류:", e);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    console.log("fetch 성공, 응답 받음");
    console.log("응답 상태:", response.status);
    console.log("응답 상태 텍스트:", response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("응답 오류:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BaseResponse<number> = await response.json();
    console.log("응답 데이터:", data);

    return data.data;
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
