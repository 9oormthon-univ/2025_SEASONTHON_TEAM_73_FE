import api from "./axios";
import { REQUEST } from "./request";

export const uploadCertificate = async (file: {
  uri: string;
  name: string;
  type: string;
}) => {
  const formData = new FormData();

  // FormData에 파일 추가
  formData.append("file", {
    uri: file.uri,
    name: file.name,
    type: file.type,
  } as any);

  const response = await api.post(REQUEST.CERTIFICATE_UPLOAD, formData);
  // FormData 사용 시 Content-Type 헤더를 명시하지 않음 (자동으로 boundary 설정됨)

  return response.data;
};
