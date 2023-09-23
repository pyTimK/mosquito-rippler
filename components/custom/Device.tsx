import { twMerge } from "tailwind-merge";
import Boat from "./Boat";
import { MouseEvent, TouchEvent, useContext, useState } from "react";
import Proppeler from "./Proppeler";
import { PagesWrapperContext } from "@/app/pages/PagesWrapper";

interface DeviceInterface {}

const Device: React.FC<DeviceInterface> = ({}) => {
  const { readingData } = useContext(PagesWrapperContext);
  const [leftProppelerClicked, setLeftProppelerClicked] = useState(false);
  const [rightProppelerClicked, setRightProppelerClicked] = useState(false);

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

  return (
    <div className="relative text-white select-none">
      <Boat />
      <div
        className={twMerge(
          "absolute cursor-pointer left-2 -bottom-16",
          leftProppelerClicked ? "animate-spin" : ""
        )}
        onTouchStart={(e) => handleProppelerTouch(e, true, true)}
        onMouseDown={(e) => handleProppelerTouch(e, true, true)}
        onTouchEnd={(e) => handleProppelerTouch(e, true, false)}
        onMouseUp={(e) => handleProppelerTouch(e, true, false)}
      >
        <Proppeler />
      </div>
      <div
        className={twMerge(
          "absolute cursor-pointer right-2 -bottom-16",
          rightProppelerClicked ? "animate-spin" : ""
        )}
        onTouchStart={(e) => handleProppelerTouch(e, false, true)}
        onMouseDown={(e) => handleProppelerTouch(e, false, true)}
        onTouchEnd={(e) => handleProppelerTouch(e, false, false)}
        onMouseUp={(e) => handleProppelerTouch(e, false, false)}
      >
        <Proppeler />
      </div>
      <div className="absolute flex gap-1 -translate-x-1/2 left-1/2 bottom-14">
        <p className="text-lg">{readingData.frequency}</p>
        <p className="text-xs">Hz</p>
      </div>
      <div className="absolute -translate-x-1/2 -translate-y-1 left-1/2 top-24">
        <p className="text-3xl">{computeBatteryLevel(readingData.voltage)}</p>
      </div>
    </div>
  );
};

function computeBatteryLevel(readVoltage: number) {
  const origVoltage = readVoltage * (14700 / 4700);
  const percent = Math.floor(((origVoltage - 9.0) / (12.6 - 9.0)) * 100);
  if (percent < 0) return 0;
  if (percent > 100) return 100;

  return percent;
}

export default Device;
