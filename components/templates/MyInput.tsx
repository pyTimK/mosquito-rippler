import { interFont } from "@/styles/fonts";
import { ChangeEventHandler, RefObject } from "react";
import { twMerge } from "tailwind-merge";

interface MyInputProps {
  type?: "text" | "number" | "email" | "password"; // Add more types as needed
  placeholder?: string;
  innerRef: RefObject<HTMLInputElement>;
  error?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  dark?: boolean;
  bg?: string;
  className?: string;
  defaultValue?: string;
}

const MyInput: React.FC<MyInputProps> = ({
  type = "text",
  placeholder,
  innerRef,
  error = false,
  onChange,
  className,
  defaultValue,
}) => {
  return (
    <div className="flex justify-center">
      <input
        ref={innerRef}
        step="any"
        className={twMerge(
          "w-full max-w-sm border rounded-lg bg-light_primary p-4",
          className,
          interFont,
          error ? "border-red" : "border-darker_primary"
        )}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></input>
    </div>
  );
};

export default MyInput;
