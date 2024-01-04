import { twMerge } from "tailwind-merge";
import Boat from "./Boat";
import {
  ChangeEvent,
  MouseEvent,
  TouchEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Proppeler from "./Proppeler";
import { PagesWrapperContext } from "@/app/pages/PagesWrapper";
import Reverse from "./Reverse";

interface DeviceInterface {}

const Device: React.FC<DeviceInterface> = ({}) => {
  const { readingData } = useContext(PagesWrapperContext);
  const [leftProppelerClicked, setLeftProppelerClicked] = useState(false);
  const [rightProppelerClicked, setRightProppelerClicked] = useState(false);
  const [reverseClicked, setReverseClicked] = useState(false);
  const sliderRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.value = String(readingData.air_pump);
    }
  }, [readingData.air_pump]);

  const handleProppelerTouch = (
    e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>,
    isLeft: boolean,
    isClicked: boolean
  ) => {
    if (e?.cancelable) {
      e.preventDefault();
    }

    if (isLeft) {
      setLeftProppelerClicked(isClicked);
    } else {
      setRightProppelerClicked(isClicked);
    }

    readingData.updateData(
      isLeft
        ? {
            left: isClicked,
            frequency: 3022,
          }
        : {
            right: isClicked,
          }
    );
  };

  const handleReverseTouch = (
    e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>,
    isClicked: boolean
  ) => {
    if (e?.cancelable) {
      e.preventDefault();
    }

    setReverseClicked(isClicked);

    readingData.updateData({
      reverse: isClicked,
    });
  };

  const handleAirPumpSliderChange = (
    e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
  ) => {
    if (!sliderRef.current) return;
    readingData.updateData({
      air_pump: Number(sliderRef.current.value),
    });
  };

  return (
    <div className="relative text-white -translate-y-10">
      {/*//! AIR PUMP SLIDER */}
      <div className="w-full text-center py-3">
        <input
          type="range"
          ref={sliderRef}
          className="my-slider"
          min="1"
          defaultValue={readingData.air_pump || 50}
          max="100"
          onTouchEnd={handleAirPumpSliderChange}
          onMouseUp={handleAirPumpSliderChange}
        />
      </div>

      {/*//! BOAT */}
      <Boat />

      {/*//! LEFT PROPPELER */}
      <div
        className={twMerge(
          "absolute cursor-pointer left-2 -bottom-16 select-none",
          leftProppelerClicked ? "animate-spin" : ""
        )}
        onTouchStart={(e) => handleProppelerTouch(e, true, true)}
        onMouseDown={(e) => handleProppelerTouch(e, true, true)}
        onTouchEnd={(e) => handleProppelerTouch(e, true, false)}
        onMouseUp={(e) => handleProppelerTouch(e, true, false)}
      >
        <Proppeler />
      </div>

      {/*//! RIHT PROPPELER */}
      <div
        className={twMerge(
          "absolute cursor-pointer right-2 -bottom-16 select-none",
          rightProppelerClicked ? "animate-spin" : ""
        )}
        onTouchStart={(e) => handleProppelerTouch(e, false, true)}
        onMouseDown={(e) => handleProppelerTouch(e, false, true)}
        onTouchEnd={(e) => handleProppelerTouch(e, false, false)}
        onMouseUp={(e) => handleProppelerTouch(e, false, false)}
      >
        <Proppeler />
      </div>

      {/*//! REVERSE */}
      <div
        className={twMerge(
          "absolute cursor-pointer left-1/2 -translate-x-1/2 -bottom-24 select-none",
          reverseClicked ? "animate-pulse" : ""
        )}
        onTouchStart={(e) => handleReverseTouch(e, true)}
        onMouseDown={(e) => handleReverseTouch(e, true)}
        onTouchEnd={(e) => handleReverseTouch(e, false)}
        onMouseUp={(e) => handleReverseTouch(e, false)}
      >
        <Reverse />
      </div>

      {/*//! FREQUENCY */}
      <div className="absolute flex gap-1 -translate-x-1/2 left-1/2 bottom-14 select-none">
        <p className="text-lg">{Math.floor(readingData.frequency)}</p>
        <p className="text-xs">Hz</p>
      </div>

      {/*//! BATTERY */}
      <div className="absolute -translate-x-1/2 -translate-y-1 left-1/2 top-36 select-none">
        <p className="text-3xl">{computeBatteryLevel(readingData.voltage)}</p>
      </div>
    </div>
  );
};

function computeBatteryLevel(readVoltage: number) {
  const origVoltage = (readVoltage + 0.1) * (14700 / 4700);
  const percent = Math.floor(((origVoltage - 9.0) / (12.6 - 9.0)) * 100);
  if (percent < 0) return 0;
  if (percent > 100) return 100;

  return percent;
}

export default Device;
