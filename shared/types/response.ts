export type BaseResponse<TData> = {
  success: boolean;
  code: string;
  message: string;
  data: TData;
};

export type BasePaginationResponse<TData> = BaseResponse<{
  content: TData;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}>;

export type LikedUserBaseRes<TData> = {
  success: boolean;
  code: string;
  message: string;
  data: {
    totalElements: number;
    totalPages: number;
    pageable: {
      paged: boolean;
      pageNumber: number;
      pageSize: number;
      offset: number;
      sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
      };
      unpaged: boolean;
    };
    size: number;
    content: TData;
    number: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
};
