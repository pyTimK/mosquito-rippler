import { Dispatch, MouseEventHandler, SetStateAction, forwardRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface MyDatePickerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({ date, setDate }) => {
  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    { value: string; onClick: MouseEventHandler<HTMLButtonElement> }
  >(({ value, onClick }, ref) => (
    <button
      className="px-4 py-2 text-white bg-transparent border-2 border-white"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  return (
    <DatePicker
      showMonthDropdown
      showYearDropdown
      selected={date}
      onChange={(date) => setDate(date ?? new Date(1995, 0, 1))}
      customInput={<ExampleCustomInput value="H" onClick={() => {}} />}
    />
  );
};

export default MyDatePicker;
