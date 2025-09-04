import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { FILTER_DEFAULT } from "../constants";
import { DefaultFilter } from "../types";

interface FilterDefaultContextProps extends DefaultFilter {
  defaultFilter: DefaultFilter;
  setDepositRange: (min: number, max: number) => void;
  setRentRange: (min: number, max: number) => void;
  setRoomType: (value: number[]) => void;
  setGender: (value: number[]) => void;
  resetFilter: () => void;
  applied: boolean;
  setApplied: (value: boolean) => void;
}

const FilterDefaultContext = createContext<FilterDefaultContextProps | null>(
  null
);

export const FilterDefaultProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [applied, setApplied] = useState(false);
  const [defaultFilter, setDefaultFilter] =
    useState<DefaultFilter>(FILTER_DEFAULT);

  const { deposit, rent, roomType, gender } = defaultFilter;

  const setRoomType = useCallback(
    (value: number[]) =>
      setDefaultFilter((prev) => ({ ...prev, roomType: value })),
    []
  );

  const setGender = useCallback(
    (value: number[]) =>
      setDefaultFilter((prev) => ({ ...prev, gender: value })),
    []
  );

  const setDepositRange = useCallback((min: number, max: number) => {
    setDefaultFilter((prev) => ({
      ...prev,
      deposit: { min, max },
    }));
  }, []);

  const setRentRange = useCallback((min: number, max: number) => {
    setDefaultFilter((prev) => ({
      ...prev,
      rent: { min, max },
    }));
  }, []);

  const resetFilter = useCallback(() => {
    setDefaultFilter(FILTER_DEFAULT);
    setApplied(false);
  }, []);

  return (
    <FilterDefaultContext.Provider
      value={{
        defaultFilter,
        deposit,
        rent,
        roomType,
        gender,
        setDepositRange,
        setRentRange,
        setRoomType,
        setGender,
        resetFilter,
        applied,
        setApplied,
      }}
    >
      {children}
    </FilterDefaultContext.Provider>
  );
};

export const useDefaultFilter = () => {
  const context = useContext(FilterDefaultContext);
  if (!context) {
    throw new Error(
      "useDefaultFilter는 FilterDefaultProvider 안에서만 사용할 수 있어요."
    );
  }
  return context;
};
