import { createContext, useContext, useState, type ReactNode } from "react";
import { UserDefaultFilter } from "../types";

interface UserFilterContextProps {
  defaultFilter: UserDefaultFilter | null;
  updateFilter: (filter: Partial<UserDefaultFilter>) => void;
  resetFilter: () => void;
}

const UserFilterContext = createContext<UserFilterContextProps | null>(null);

export const UserFilterProvider = ({ children }: { children: ReactNode }) => {
  const [defaultFilter, setDefaultFilter] = useState<UserDefaultFilter | null>(
    null
  );

  const updateFilter = (filter: Partial<UserDefaultFilter>) => {
    console.log("Context 필터 업데이트:", filter);
    setDefaultFilter((prev) => {
      let newFilter = { ...prev };

      Object.entries(filter).forEach(([key, value]) => {
        if (value === undefined) {
          const { [key as keyof UserDefaultFilter]: removed, ...rest } =
            newFilter || {};
          newFilter = rest;
        } else {
          newFilter = {
            ...newFilter,
            [key]: value,
          };
        }
      });

      console.log("Context 최종 필터 상태:", newFilter);
      return newFilter;
    });
  };

  const resetFilter = () => {
    console.log("필터 리셋");
    setDefaultFilter(null);
  };

  return (
    <UserFilterContext.Provider
      value={{ defaultFilter, updateFilter, resetFilter }}
    >
      {children}
    </UserFilterContext.Provider>
  );
};

export const useUserFilter = () => {
  const context = useContext(UserFilterContext);
  if (!context) {
    throw new Error(
      "useUserFilter는 UserFilterProvider 안에서만 사용할 수 있어요."
    );
  }
  return context;
};
