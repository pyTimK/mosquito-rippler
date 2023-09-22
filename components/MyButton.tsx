import { interFont, jsoFont } from "@/styles/fonts";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface MyButtonProps {
  onClick?: MouseEventHandler;
  label: string;
  type?: "button" | "submit" | "reset";
  noMargin?: boolean;
  color?: string;
  outline?: boolean;
  textColor?: string;
  fontWeight?: string;
  pX?: number;
  pY?: number;
  notRounded?: boolean;
  borderColor?: string;
  roundedSize?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  onClick,
  label,
  type,
  noMargin = false,
  color,
  outline,
  textColor,
  fontWeight = "font-light",
  pX = 2,
  pY = 1,
  notRounded = false,
  borderColor,
  roundedSize = "rounded-2xl",
}) => {
  return (
    <motion.button
      type={type}
      className={`fit-content ${
        noMargin ? "m-0" : "m-auto"
      } outline-none shadow-none `}
      onClick={onClick}
      whileTap={{ scale: 0.8 }}
    >
      <p
        className={`${borderColor} ${interFont} ${textColor ?? `text-white`} ${
          fontWeight ?? "font-light"
        } ${notRounded ? "" : roundedSize} ${
          outline ? "" : color || "bg-darker_primary"
        }  fit-content m-auto`}
        style={{ padding: `${pY}rem ${pX}rem` }}
      >
        {label}
      </p>
    </motion.button>
  );
};

export default MyButton;
