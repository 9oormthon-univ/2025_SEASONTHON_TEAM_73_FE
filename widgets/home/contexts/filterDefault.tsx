import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Gender } from "../../../shared/constants";
import { FILTER_DEFAULT } from "../constants";
import { DefaultFilter } from "../types";

interface FilterDefaultContextProps extends DefaultFilter {
  defaultFilter: DefaultFilter;
  setDepositRange: (min: number, max: number) => void;
  setRentRange: (min: number, max: number) => void;
  setRoomTypes: (value: string[]) => void;
  setGender: (value: Gender) => void;
  setKeyword: (value: string) => void;
  setDongs: (value: string[]) => void;
  resetFilter: () => void;
  resetDepositRange: () => void;
  resetRentRange: () => void;
  resetRoomTypes: () => void;
  resetGender: () => void;
  resetKeyword: () => void;
  resetDongs: () => void;
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

  const {
    minDeposit,
    maxDeposit,
    minMonthlyCost,
    maxMonthlyCost,
    roomTypes,
    preferredGender,
    keyword,
    dongs,
  } = defaultFilter;

  const setRoomTypes = useCallback(
    (value: string[]) =>
      setDefaultFilter((prev) => ({ ...prev, roomTypes: value })),
    []
  );

  const setGender = useCallback(
    (value: Gender) =>
      setDefaultFilter((prev) => {
        const currentGenders = prev.preferredGender;
        const isAlreadySelected = currentGenders.includes(value);

        return {
          ...prev,
          preferredGender: isAlreadySelected
            ? currentGenders.filter((gender) => gender !== value)
            : [...currentGenders, value],
        };
      }),
    []
  );

  const setKeyword = useCallback(
    (value: string) =>
      setDefaultFilter((prev) => ({ ...prev, keyword: value })),
    []
  );

  const setDongs = useCallback(
    (value: string[]) =>
      setDefaultFilter((prev) => ({ ...prev, dongs: value })),
    []
  );

  const setDepositRange = useCallback((min: number, max: number) => {
    setDefaultFilter((prev) => ({
      ...prev,
      minDeposit: min,
      maxDeposit: max,
    }));
  }, []);

  const setRentRange = useCallback((min: number, max: number) => {
    setDefaultFilter((prev) => ({
      ...prev,
      minMonthlyCost: min,
      maxMonthlyCost: max,
    }));
  }, []);

  const resetFilter = useCallback(() => {
    setDefaultFilter(FILTER_DEFAULT);
    setApplied(false);
  }, []);

  const resetDepositRange = useCallback(() => {
    setDefaultFilter((prev) => ({
      ...prev,
      minDeposit: FILTER_DEFAULT.minDeposit,
      maxDeposit: FILTER_DEFAULT.maxDeposit,
    }));
  }, []);

  const resetRentRange = useCallback(() => {
    setDefaultFilter((prev) => ({
      ...prev,
      minMonthlyCost: FILTER_DEFAULT.minMonthlyCost,
      maxMonthlyCost: FILTER_DEFAULT.maxMonthlyCost,
    }));
  }, []);

  const resetRoomTypes = useCallback(() => {
    setDefaultFilter((prev) => ({
      ...prev,
      roomTypes: FILTER_DEFAULT.roomTypes,
    }));
  }, []);

  const resetGender = useCallback(() => {
    setDefaultFilter((prev) => ({
      ...prev,
      preferredGender: FILTER_DEFAULT.preferredGender,
    }));
  }, []);

  const resetKeyword = useCallback(() => {
    setDefaultFilter((prev) => ({
      ...prev,
      keyword: FILTER_DEFAULT.keyword,
    }));
  }, []);

  const resetDongs = useCallback(() => {
    setDefaultFilter((prev) => ({
      ...prev,
      dongs: FILTER_DEFAULT.dongs,
    }));
  }, []);

  return (
    <FilterDefaultContext.Provider
      value={{
        defaultFilter,
        minDeposit,
        maxDeposit,
        minMonthlyCost,
        maxMonthlyCost,
        roomTypes,
        preferredGender,
        keyword,
        dongs,
        setDepositRange,
        setRentRange,
        setRoomTypes,
        setGender,
        setKeyword,
        setDongs,
        resetFilter,
        resetDepositRange,
        resetRentRange,
        resetRoomTypes,
        resetGender,
        resetKeyword,
        resetDongs,
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
