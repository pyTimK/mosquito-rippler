import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface EditIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const EditIcon: React.FC<EditIconProps> = ({ onClick }) => (
  <motion.svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileTap={{ scale: 0.8 }}
    onClick={onClick}
  >
    <g clipPath="url(#clip0_8_35)">
      <path
        d="M17.7333 5.33336L9.78325 13.2833C8.99158 14.075 6.64156 14.4416 6.11656 13.9166C5.59156 13.3916 5.94989 11.0416 6.74156 10.25L14.6999 2.29166C14.8962 2.07755 15.1338 1.90543 15.3984 1.78568C15.663 1.66593 15.9492 1.60101 16.2396 1.5949C16.5299 1.58879 16.8186 1.64157 17.088 1.75008C17.3574 1.85859 17.6021 2.02059 17.8072 2.22626C18.0123 2.43192 18.1736 2.67701 18.2813 2.94672C18.3891 3.21645 18.4412 3.5052 18.4343 3.79557C18.4273 4.08595 18.3616 4.37194 18.2412 4.63623C18.1207 4.90052 17.9479 5.13768 17.7333 5.33336Z"
        stroke="#FED7BB"
        strokeOpacity="0.95"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16666 3.33331H5C4.11594 3.33331 3.26815 3.6845 2.64302 4.30962C2.01791 4.93475 1.66666 5.78259 1.66666 6.66665V15C1.66666 15.8841 2.01791 16.7319 2.64302 17.357C3.26815 17.9821 4.11594 18.3333 5 18.3333H14.1667C16.0083 18.3333 16.6667 16.8333 16.6667 15V10.8333"
        stroke="#FED7BB"
        strokeOpacity="0.95"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_8_35">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </motion.svg>
);

export default EditIcon;
