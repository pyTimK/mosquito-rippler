import useFirestoreData, {
  FirestoreDataType,
  convertTimestampsToDate,
} from "@/hooks/useFirestoreData";
import { interFont, jsoFont } from "@/styles/fonts";
import { db } from "../firebase";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { Constants } from "../constants";
import { DeviceData, constructEmptyDeviceData } from "@/classes/DeviceData";
import React, { createContext, useEffect, useState } from "react";
import { UserData, constructEmptyUserData } from "@/classes/UserData";
import MeasuringPageWrapper from "../measuring";
import MyButton from "@/components/MyButton";

export const DevicePageContext = createContext({
  deviceData: {} as FirestoreDataType<DeviceData>,
  userData: {} as FirestoreDataType<UserData>,
});

const DevicePage: React.FC = () => {
  const deviceData = useFirestoreData(
    doc(db, "devices", Constants.qrCode),
    constructEmptyDeviceData
  );

  const [userData, setUserData] = useState({} as FirestoreDataType<UserData>);

  useEffect(() => {
    const updateData = async (new_fields: Partial<UserData>) => {
      await updateDoc(doc(db, "users", deviceData.user_id), {
        ...new_fields,
      });
    };

    if (deviceData.user_id) {
      const unsub = onSnapshot(doc(db, "users", deviceData.user_id), (doc) => {
        let rawData = doc.data();
        const dataWithConvertedDates = convertTimestampsToDate(rawData);

        setUserData({
          ...((dataWithConvertedDates as UserData) ?? constructEmptyUserData()),
          updateData,
        });
      });
      return () => unsub();
    }
  }, [deviceData.user_id]);

  return (
    <DevicePageContext.Provider value={{ deviceData, userData }}>
      {deviceData.is_measuring ? <MeasuringPageWrapper isDevice /> : <QRPage />}
    </DevicePageContext.Provider>
  );
};

interface QRPageProps {}

const QRPage: React.FC<QRPageProps> = () => {
  return (
    <div className="flex flex-col space-y-20 px-8 justify-center items-center h-screen text-white bg-darker_primary">
      <p className={`${jsoFont} text-5xl text-center`}>
        Smart Interactive <br />
        Health Kiosk
      </p>
      {/* <p className={`${jsoFont} text-5xl text-center`}>Smart Medical Kiosk</p> */}
      <img src="/images/qr.png" alt="medical kiosk" width={300} />
      <p className={`${interFont} text-3xl text-center`}>
        Scan to start measuring
      </p>
      <MyButton
        label="Measure now"
        color="bg-white"
        textColor="text-darkest_primary"
        onClick={() => {
          setDoc(doc(db, "devices", Constants.qrCode), {
            is_measuring: true,
            user_id: "2jB6OQm9PGh6M17uAgCkU6C5RPh2",
          } as DeviceData);
        }}
      />
    </div>
  );
};

export default DevicePage;
