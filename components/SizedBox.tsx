interface SizedBoxProps {
  width?: number | string;
  height?: number | string;
}

const SizedBox: React.FC<SizedBoxProps> = ({ width, height }) => {
  const style: React.CSSProperties = {
    width: width || "auto",
    height: height || "auto",
  };

  return <div style={style}></div>;
};

export default SizedBox;
