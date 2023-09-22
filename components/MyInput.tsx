import { interFont } from "@/styles/fonts";
import { ChangeEventHandler, RefObject } from "react";

interface MyInputProps {
  type?: "text" | "number" | "email" | "password"; // Add more types as needed
  placeholder: string;
  innerRef: RefObject<HTMLInputElement>;
  error?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  dark?: boolean;
  bg?: string;
  borderColor?: string;
  className?: string;
}

const MyInput: React.FC<MyInputProps> = ({
  type = "text",
  placeholder,
  innerRef,
  error = false,
  onChange,
  borderColor = "border-darker_primary",
  className,
}) => {
  return (
    <div className="flex justify-center">
      <input
        ref={innerRef}
        className={`${className} ${interFont} p-4`}
        type={type}
        style={{ borderColor: `${error ? "red" : `${borderColor}`}` }}
        onChange={onChange}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default MyInput;

// import { ChangeEventHandler, RefObject } from "react";

// interface MyInputProps {
//   type?: "text" | "number" | "email" | "password"; // Add more types as needed
//   placeholder: string;
//   innerRef: RefObject<HTMLInputElement>;
//   error?: boolean;
//   onChange?: ChangeEventHandler<HTMLInputElement>;
//   dark?: boolean;
//   bg?: string;
//   borderColor?: string;
//   className?: string;
// }

// const MyInput: React.FC<MyInputProps> = ({
//   type = "text",
//   placeholder,
//   innerRef,
//   error = false,
//   onChange,
//   dark = false,
//   bg,
//   borderColor = "border-darker_primary",
//   className,
// }) => {
//   return (
//     <div className="flex justify-center">
//       <input
//         ref={innerRef}
//         className={`${className} border ${
//           error ? "border-red" : borderColor
//         } rounded-lg w-full max-w-sm ${
//           dark ? "text-white font-light p-1 text-right" : "p-4"
//         } ${bg ? bg : dark ? "bg-darker_primary2" : "bg-light_primary"}`}
//         type={type}
//         style={{ borderColor: `${error ? "red" : borderColor}` }}
//         onChange={onChange}
//         placeholder={placeholder}
//       ></input>
//     </div>
//   );
// };

// export default MyInput;
