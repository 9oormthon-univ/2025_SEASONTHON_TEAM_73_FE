import { useAuthStore } from "@/shared/store";
import { BaseResponse } from "@/shared/types";
import Constants, { NativeConstants } from "expo-constants";
import { REQUEST } from "../../../shared/api/request";

const config = Constants as NativeConstants;
const { BACKEND_API_URL } = config.expoConfig!.extra!;

const submitUser = async (formData: FormData) => {
  console.log("submitUser 호출됨");

  const { accessToken } = useAuthStore.getState();
  console.log("accessToken:", accessToken ? "있음" : "없음");

  const url = `${BACKEND_API_URL}${REQUEST.USER_VERIFY}`;
  console.log("요청 URL:", url);

  const headers: HeadersInit = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  console.log("FormData 전송 중...");

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
  });

  console.log("응답 상태:", response.status);
  console.log("응답 상태 텍스트:", response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("응답 오류:", errorText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: BaseResponse<any> = await response.json();
  console.log("응답 데이터:", data);

  return data.data;
};

export default submitUser;
