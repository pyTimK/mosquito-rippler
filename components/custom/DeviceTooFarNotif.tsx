import { jsoFont } from "@/styles/fonts";
import { twMerge } from "tailwind-merge";
import LocationIcon from "../svg/icon/LocationIcon";
import { useContext } from "react";
import { PagesWrapperContext } from "@/app/pages/PagesWrapper";

interface DeviceTooFarNotifProps {
  setShowSettingsWithEnd: (show: boolean, end?: boolean | undefined) => void;
}

const DeviceTooFarNotif: React.FC<DeviceTooFarNotifProps> = ({
  setShowSettingsWithEnd,
}) => {
  return (
    <div
      className="absolute top-0 flex items-center justify-center w-full h-16 gap-3 text-white shadow cursor-pointer bg-red_info"
      onClick={(e) => {
        e.preventDefault();
        setShowSettingsWithEnd(true, true);
      }}
    >
      <p className={twMerge("text-lg", jsoFont)}>DEVICE IS GETTING TOO FAR</p>
      <div className="-translate-y-1">
        <LocationIcon />
      </div>
    </div>
  );
};

export default DeviceTooFarNotif;
