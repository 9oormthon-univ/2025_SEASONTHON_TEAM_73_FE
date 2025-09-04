export type BaseResponse<TData> = {
  success: boolean;
  code: string;
  message: string;
  data: TData;
};
