import { renderMultiRadio, renderRangeSlider } from "@/shared/utils";
import {
  getDepositDisplayValue,
  getGenderDisplayValue,
  getGenderSelectedIndices,
  getRentDisplayValue,
  getRoomTypeDisplayValue,
  getRoomTypeSelectedIndices,
  ROOM_FILTER_FIELDS,
} from "@/widgets/home/constants";

interface RoomTypeTabProps {
  localDeposit: [number, number];
  localRent: [number, number];
  localRoomTypes: string[];
  localGender: string[];
  onDepositChange: (depositMin: number, depositMax: number) => void;
  onRentChange: (rentMin: number, rentMax: number) => void;
  onRoomTypeChange: (roomTypes: string[]) => void;
  onGenderChange: (gender: string[]) => void;
}

export default function RoomTypeTab({
  localDeposit,
  localRent,
  localRoomTypes,
  localGender,
  onDepositChange,
  onRentChange,
  onRoomTypeChange,
  onGenderChange,
}: RoomTypeTabProps) {
  return (
    <>
      {renderRangeSlider(
        ROOM_FILTER_FIELDS.DEPOSIT.title,
        getDepositDisplayValue(localDeposit),
        localDeposit,
        ROOM_FILTER_FIELDS.DEPOSIT.min,
        ROOM_FILTER_FIELDS.DEPOSIT.max,
        ROOM_FILTER_FIELDS.DEPOSIT.step,
        onDepositChange
      )}

      {renderRangeSlider(
        ROOM_FILTER_FIELDS.RENT.title,
        getRentDisplayValue(localRent),
        localRent,
        ROOM_FILTER_FIELDS.RENT.min,
        ROOM_FILTER_FIELDS.RENT.max,
        ROOM_FILTER_FIELDS.RENT.step,
        onRentChange
      )}

      {renderMultiRadio(
        ROOM_FILTER_FIELDS.ROOM_TYPE.title,
        getRoomTypeDisplayValue(localRoomTypes),
        ROOM_FILTER_FIELDS.ROOM_TYPE.options.map((option) => option.label),
        getRoomTypeSelectedIndices(localRoomTypes),
        (selected) => {
          const keys = ROOM_FILTER_FIELDS.ROOM_TYPE.options.map(
            (option) => option.key
          );
          onRoomTypeChange(selected.map((index) => keys[index]));
        },
        true
      )}

      {renderMultiRadio(
        ROOM_FILTER_FIELDS.GENDER.title,
        getGenderDisplayValue(localGender),
        ROOM_FILTER_FIELDS.GENDER.options.map((option) => option.label),
        getGenderSelectedIndices(localGender),
        (selected) => {
          const keys = ROOM_FILTER_FIELDS.GENDER.options.map(
            (option) => option.key
          );
          onGenderChange(selected.map((index) => keys[index]));
        },
        true
      )}
    </>
  );
}
