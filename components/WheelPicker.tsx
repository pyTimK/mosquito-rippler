import React, { useState, useRef } from "react";

interface NumberWheelPickerProps {
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const NumberWheelPicker: React.FC<NumberWheelPickerProps> = ({
  min = 0,
  max = 100,
  step = 1,
  onChange = () => {},
}) => {
  const [value, setValue] = useState((max + min) / 2);
  const [isDragging, setIsDragging] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    updateValue(value - e.deltaY * step);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      updateValue(value - e.movementY * step);
    }
  };

  const updateValue = (newValue: number) => {
    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;
    setValue(newValue);
    onChange(newValue);
  };

  const renderNumbers = () => {
    const numbers = [];
    for (let i = value + 5 * step; i >= value - 5 * step; i -= step) {
      if (i <= max && i >= min) {
        numbers.push(
          <div
            key={i}
            style={{ fontSize: "24px", opacity: i === value ? 1 : 0.5 }}
          >
            {i}
          </div>
        );
      }
    }
    return numbers;
  };

  return (
    <div
      ref={wheelRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      style={{
        overflow: "hidden",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ccc",
        padding: "10px",
        userSelect: "none",
        cursor: "grab",
      }}
    >
      {renderNumbers()}
    </div>
  );
};

export default NumberWheelPicker;
