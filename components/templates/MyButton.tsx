import { jsoFont } from "@/styles/fonts";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface MyButtonProps {
  onClick?: MouseEventHandler;
  label: string;
  type?: "button" | "submit" | "reset";
  pX?: number;
  pY?: number;
  disabled?: boolean;
  className?: string;
  classNameText?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  onClick,
  label,
  type,
  pX = 1.2,
  pY = 0.5,
  disabled,
  className,
  classNameText,
}) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={twMerge(
        "rounded-full bg-darker_primary m-auto shadow-none outline-none fit-content",
        className,
        disabled ? "cursor-default opacity-50" : "cursor-pointer opacity-100"
      )}
      onClick={onClick}
      whileTap={{ scale: disabled ? 1.0 : 0.8 }}
    >
      <p
        className={twMerge(
          "text-white font-light fit-content m-auto",
          classNameText,
          jsoFont
        )}
        style={{ padding: `${pY}rem ${pX}rem` }}
      >
        {label}
      </p>
    </motion.button>
  );
};

export default MyButton;
