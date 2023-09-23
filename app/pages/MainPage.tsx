import SizedBox from "@/components/SizedBox";
import Header from "@/components/custom/Header";
import MosquitoCountBarGraph from "@/components/custom/MosquitoCountBarGraph";
import MosquitoDetectedRow from "@/components/custom/MosquitoDetectedRow";
import Ocean from "@/components/custom/Ocean";
import ExitIcon from "@/components/svg/icon/ExitIcon";
import SettingsIcon from "@/components/svg/icon/SettingsIcon";
import signOutClick from "@/myfunctions/signOutClick";
import { useContext, useEffect, useState } from "react";
import { PagesWrapperContext } from "./PagesWrapper";
import DeviceTooFarNotif from "@/components/custom/DeviceTooFarNotif";
import haversineDistance from "@/myfunctions/harvesineDistance";
import notify from "@/myfunctions/notify";

interface MainPageInterface {}
const MainPage: React.FC<MainPageInterface> = () => {
  const { setShowSettingsWithEnd, readingData } =
    useContext(PagesWrapperContext);

  const [deviceTooFar, setDeviceTooFar] = useState(false);

  useEffect(() => {
    const timeIntervalId = setInterval(() => {
      if (readingData) {
        const distance = haversineDistance(
          readingData.geo_lat,
          readingData.geo_long,
          readingData.lat,
          readingData.long
        );
        console.log(distance);
        if (distance > readingData.geo_radius / 1000) {
          setDeviceTooFar(true);
          notify(() => {
            return (
              <DeviceTooFarNotif
                setShowSettingsWithEnd={setShowSettingsWithEnd}
              />
            );
          });
        } else {
          setDeviceTooFar(false);
        }
      }
    }, 60000);

    return () => {
      clearInterval(timeIntervalId);
    };
  }, [readingData]);

  console.log(deviceTooFar);
  return (
    <div>
      {/* HEADER */}
      <Header>
        <ExitIcon onClick={signOutClick} />
        <SettingsIcon onClick={() => setShowSettingsWithEnd(true)} />
      </Header>

      {/* CONTENT */}
      <SizedBox height={30} />
      <MosquitoCountBarGraph />
      <MosquitoDetectedRow />
      <Ocean />

      {/* NOTIF */}
      {/* {deviceTooFar && < />} */}
    </div>
  );
};

export default MainPage;
