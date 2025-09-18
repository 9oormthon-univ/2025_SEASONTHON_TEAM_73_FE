import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Gender } from "../../../shared/constants";
import { DefaultFilter, SelectedRegion, UserDefaultFilter } from "../types";

interface FilterDefaultContextProps {
  roomFilter: Partial<DefaultFilter>;
  userFilter: Partial<UserDefaultFilter> | null;
  setDepositRange: (min: number, max: number) => void;
  setRentRange: (min: number, max: number) => void;
  setRoomTypes: (value: string[]) => void;
  setGender: (value: Gender) => void;
  setGenders: (value: Gender[]) => void;
  setKeyword: (value: string) => void;
  setDongs: (value: string[]) => void;
  setSelectedRegions: (value: SelectedRegion[]) => void;
  setUserFilter: (value: Partial<UserDefaultFilter> | null) => void;
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
  const [roomFilter, setRoomFilter] = useState<Partial<DefaultFilter>>({});
  const [userFilter, setUserFilter] =
    useState<Partial<UserDefaultFilter> | null>(null);

  const setRoomTypes = useCallback(
    (value: string[]) =>
      setRoomFilter((prev) => ({ ...prev, roomTypes: value })),
    []
  );

  const setGender = useCallback(
    (value: Gender) =>
      setRoomFilter((prev) => {
        const currentGenders = prev.preferredGender || [];
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
      setRoomFilter((prev) => ({ ...prev, preferredGender: value })),
    []
  );

  const setKeyword = useCallback(
    (value: string) => setRoomFilter((prev) => ({ ...prev, keyword: value })),
    []
  );

  const setDongs = useCallback(
    (value: string[]) => setRoomFilter((prev) => ({ ...prev, dongs: value })),
    []
  );

  const setSelectedRegions = useCallback(
    (value: SelectedRegion[]) =>
      setRoomFilter((prev) => ({ ...prev, selectedRegions: value })),
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
    setRoomFilter((prev) => ({
      ...prev,
      minDeposit: min,
      maxDeposit: max,
    }));
  }, []);

  const setRentRange = useCallback((min: number, max: number) => {
    setRoomFilter((prev) => ({
      ...prev,
      minMonthlyCost: min,
      maxMonthlyCost: max,
    }));
  }, []);

  const resetFilter = useCallback(() => {
    setRoomFilter({});
    setUserFilter(null);
  }, []);

  const resetDepositRange = useCallback(() => {
    setRoomFilter((prev) => {
      const { minDeposit, maxDeposit, ...rest } = prev;
      return rest;
    });
  }, []);

  const resetRentRange = useCallback(() => {
    setRoomFilter((prev) => {
      const { minMonthlyCost, maxMonthlyCost, ...rest } = prev;
      return rest;
    });
  }, []);

  const resetRoomTypes = useCallback(() => {
    setRoomFilter((prev) => {
      const { roomTypes, ...rest } = prev;
      return rest;
    });
  }, []);

  const resetGender = useCallback(() => {
    setRoomFilter((prev) => {
      const { preferredGender, ...rest } = prev;
      return rest;
    });
  }, []);

  const resetKeyword = useCallback(() => {
    setRoomFilter((prev) => {
      const { keyword, ...rest } = prev;
      return rest;
    });
  }, []);

  const resetDongs = useCallback(() => {
    setRoomFilter((prev) => {
      const { dongs, selectedRegions, ...rest } = prev;
      return rest;
    });
  }, []);

  return (
    <FilterDefaultContext.Provider
      value={{
        roomFilter,
        userFilter,
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
