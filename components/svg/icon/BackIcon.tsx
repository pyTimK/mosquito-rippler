import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface BackIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const BackIcon: React.FC<BackIconProps> = ({ onClick }) => (
  <motion.svg
    width="17"
    height="29"
    viewBox="0 0 17 29"
    fill="none"
    whileTap={{ scale: 0.8 }}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.9">
      <path
        d="M14.5006 28.2618C14.8794 28.6062 15.4649 28.5718 15.8093 28.193C16.1537 27.8141 16.1193 27.2286 15.7404 26.8842L2.41187 14.8299C2.06746 14.52 2.06746 14.0722 2.41187 13.7623L15.7404 2.1213C16.1193 1.77689 16.1537 1.1914 15.8438 0.81255C15.4994 0.433701 14.9139 0.399261 14.535 0.709228L1.20644 12.3846C0.0354545 13.4179 0.00101429 15.1399 1.172 16.2076L14.5006 28.2618Z"
        fill="#C52222"
      />
    </g>
  </motion.svg>
);

export default BackIcon;
