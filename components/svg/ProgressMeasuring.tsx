interface ProgressMeasuringProps {
  level: number;
}

const ProgressMeasuring: React.FC<ProgressMeasuringProps> = ({ level }) => (
  <svg
    width="288"
    height="20"
    viewBox="0 0 288 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="10" y="8" width="267" height="3" fill="#D9D9D9" />
    <circle
      cx="10"
      cy="10"
      r="9"
      fill={level >= 1 ? "#D9D9D9" : "#716EF9"}
      stroke="#D9D9D9"
      strokeWidth="2"
    />
    <circle
      cx="99.3333"
      cy="10"
      r="9"
      fill={level >= 2 ? "#D9D9D9" : "#716EF9"}
      stroke="#D9D9D9"
      strokeWidth="2"
    />
    <circle
      cx="188.667"
      cy="10"
      r="9"
      fill={level >= 3 ? "#D9D9D9" : "#716EF9"}
      stroke="#D9D9D9"
      strokeWidth="2"
    />
    <circle
      cx="278"
      cy="10"
      r="9"
      fill={level >= 4 ? "#D9D9D9" : "#716EF9"}
      stroke="#D9D9D9"
      strokeWidth="2"
    />
  </svg>
);

export default ProgressMeasuring;
