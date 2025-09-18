import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Gender } from "../../../shared/constants";
import { FILTER_DEFAULT } from "../constants";
import { DefaultFilter, SelectedRegion, UserDefaultFilter } from "../types";

interface FilterDefaultContextProps extends DefaultFilter {
  defaultFilter: DefaultFilter;
  userFilter: UserDefaultFilter | null;
  setDepositRange: (min: number, max: number) => void;
  setRentRange: (min: number, max: number) => void;
  setRoomTypes: (value: string[]) => void;
  setGender: (value: Gender) => void;
  setGenders: (value: Gender[]) => void;
  setKeyword: (value: string) => void;
  setDongs: (value: string[]) => void;
  setSelectedRegions: (value: SelectedRegion[]) => void;
  setUserFilter: (value: UserDefaultFilter | null) => void;
  updateUserFilter: (filter: Partial<UserDefaultFilter>) => void;
  resetFilter: () => void;
  resetDepositRange: () => void;
  resetRentRange: () => void;
  resetRoomTypes: () => void;
  resetGender: () => void;
  resetKeyword: () => void;
  resetDongs: () => void;
  resetUserFilter: () => void;
}

const FilterDefaultContext = createContext<FilterDefaultContextProps | null>(
  null
);

export const FilterDefaultProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [defaultFilter, setDefaultFilter] =
    useState<DefaultFilter>(FILTER_DEFAULT);
  const [userFilter, setUserFilter] = useState<UserDefaultFilter | null>(null);

  const {
    minDeposit,
    maxDeposit,
    minMonthlyCost,
    maxMonthlyCost,
    roomTypes,
    preferredGender,
    keyword,
    dongs,
    selectedRegions,
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

  const setGenders = useCallback(
    (value: Gender[]) =>
      setDefaultFilter((prev) => ({ ...prev, preferredGender: value })),
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

  const setSelectedRegions = useCallback(
    (value: SelectedRegion[]) =>
      setDefaultFilter((prev) => ({ ...prev, selectedRegions: value })),
    []
  );

  const updateUserFilter = useCallback((filter: Partial<UserDefaultFilter>) => {
    setUserFilter((prev) => {
      const newFilter = { ...prev, ...filter };

      // undefined 값들을 제거
      Object.keys(newFilter).forEach((key) => {
        if (newFilter[key as keyof UserDefaultFilter] === undefined) {
          delete newFilter[key as keyof UserDefaultFilter];
        }
      });

      // 빈 객체인 경우 null 반환
      if (Object.keys(newFilter).length === 0) {
        return null;
      }

      return newFilter;
    });
  }, []);

  const resetUserFilter = useCallback(() => {
    setUserFilter(null);
  }, []);

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
    setUserFilter(null);
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
      selectedRegions: FILTER_DEFAULT.selectedRegions,
    }));
  }, []);

  return (
    <FilterDefaultContext.Provider
      value={{
        defaultFilter,
        userFilter,
        minDeposit,
        maxDeposit,
        minMonthlyCost,
        maxMonthlyCost,
        roomTypes,
        preferredGender,
        keyword,
        dongs,
        selectedRegions,
        setDepositRange,
        setRentRange,
        setRoomTypes,
        setGender,
        setGenders,
        setKeyword,
        setDongs,
        setSelectedRegions,
        setUserFilter,
        updateUserFilter,
        resetFilter,
        resetDepositRange,
        resetRentRange,
        resetRoomTypes,
        resetGender,
        resetKeyword,
        resetDongs,
        resetUserFilter,
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
