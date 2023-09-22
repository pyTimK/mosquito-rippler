import { UserData, constructEmptyUserData } from "@/classes/UserData";
import AvatarCard from "@/components/AvatarCard";
import useFirestoreData, { FirestoreDataType } from "@/hooks/useFirestoreData";
import { User } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import RegisterPage from "../register";
import SizedBox from "@/components/SizedBox";
import MenuBar from "@/components/MenuBar";
import MyButton from "@/components/MyButton";
import { useZxing } from "react-zxing";
import { SimpleDialogContainer, simpleAlert } from "react-simple-dialogs";
import Modal from "react-modal";
import { Constants } from "../constants";
import { DeviceData } from "@/classes/DeviceData";
import MeasuringPageWrapper from "../measuring";
import { toZeroIfNAN } from "@/myfunctions/formatNumber";

export const MainPageContext = createContext({
  user: {} as User,
  userData: {} as FirestoreDataType<UserData>,
  setIsEditingUserData: {} as React.Dispatch<React.SetStateAction<boolean>>,
});

interface MainPageInterface {
  user: User;
}
const MainPage: React.FC<MainPageInterface> = ({ user }) => {
  const [isEditingUserData, setIsEditingUserData] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userData = useFirestoreData(
    doc(db, "users", user.uid),
    constructEmptyUserData
  );

  console.log("USER_DATAAAAAAAAAAAAAAAAAAAAAAA");
  console.log(userData);

  if (!userData.uid || isEditingUserData) {
    return (
      <MainPageContext.Provider
        value={{ user, userData, setIsEditingUserData }}
      >
        <RegisterPage
          isEditingUserData={isEditingUserData}
          setIsEditingUserData={setIsEditingUserData}
        />
      </MainPageContext.Provider>
    );
  }

  if (userData.is_measuring) {
    return (
      <MainPageContext.Provider
        value={{ user, userData, setIsEditingUserData }}
      >
        <MeasuringPageWrapper isDevice={false} />
      </MainPageContext.Provider>
    );
  }

  const lastMeasuredDate = (
    (userData.record_date as Date) ?? new Date()
  ).toLocaleDateString("en-US", lastMeasuredDateOption);

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setModalIsOpen(false);
  }

  console.log(userData);

  return (
    <div className="py-4 px-4">
      <MainPageContext.Provider
        value={{ user, userData, setIsEditingUserData }}
      >
        <MenuBar />
        <SizedBox height={10} />
        <AvatarCard />

        {userData.weight !== 0 && <HealthGrid userData={userData} />}
        <div className="flex flex-col space-y-3 justify-center items-center mt-10">
          <MyButton
            label="Measure"
            onClick={() => {
              openModal();
            }}
            pX={5}
            roundedSize="rounded-full"
          />
          {userData.weight !== 0 && (
            <p className="text-xs font-light ml-4">
              Last Measured: {lastMeasuredDate}
            </p>
          )}
        </div>
        <SimpleDialogContainer />
        <Modal
          isOpen={modalIsOpen}
          className="absolute bg-darker_primary text-white rounded-xl py-5 px-5 inset-0 w-fit h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // style={customStyles}
          contentLabel="Example Modal"
        >
          <p className="whitespace-nowrap text-2xl font-light mb-5">
            Scan Device QR
          </p>
          <BarcodeScanner closeModal={closeModal} />
        </Modal>
      </MainPageContext.Provider>
    </div>
  );
};

interface BarCodeScannerProps {
  closeModal: () => void;
}

const BarcodeScanner: React.FC<BarCodeScannerProps> = ({ closeModal }) => {
  const [result, setResult] = useState("");
  const { userData } = useContext(MainPageContext);
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  useEffect(() => {
    if (result === Constants.qrCode) {
      userData.updateData({
        is_measuring: true,
      });

      setDoc(doc(db, "devices", Constants.qrCode), {
        is_measuring: true,
        user_id: userData.uid,
      } as DeviceData);
      closeModal();
    }
  }, [result]);

  return (
    <>
      <video ref={ref} />
    </>
  );
};

interface HealthGridProps {
  userData: FirestoreDataType<UserData>;
}

export const HealthGrid: React.FC<HealthGridProps> = ({ userData }) => {
  return (
    <div className="flex flex-col w-full mt-10">
      <div className="flex m-auto">
        <HealthBox
          value={`${Math.floor(toZeroIfNAN(userData.weight))}`}
          units="kg"
          name="Weight"
        />
        <HealthBox
          value={`${Math.floor(toZeroIfNAN(userData.height))}`}
          units="cm"
          name="Height"
        />
      </div>
      <div className="flex m-auto">
        <HealthBox
          value={`${Math.floor(toZeroIfNAN(userData.temperature))}`}
          units="°C"
          name="Temperature"
        />
        <HealthBox
          value={`${Math.floor(toZeroIfNAN(userData.heart_rate))}`}
          units="bpm"
          name="Heart Rate"
        />
      </div>
      <div className="flex m-auto">
        <HealthBox
          value={`${Math.floor(toZeroIfNAN(userData.blood_oxygen))}`}
          units="%"
          name="Blood Oxygen"
        />
        <HealthBox
          value={`${Math.floor(
            toZeroIfNAN(userData.blood_pressure_diastolic)
          )}/${Math.floor(toZeroIfNAN(userData.blood_pressure_systolic))}`}
          units="mmHg"
          small
          name="Blood Pressure"
        />
      </div>
    </div>
  );
};

interface HealthBoxProps {
  value: string;
  units: string;
  name: string;
  small?: boolean;
}

const HealthBox: React.FC<HealthBoxProps> = ({
  value,
  units,
  name,
  small = false,
}) => {
  return (
    <div className="w-32 h-32 border border-darker_secondary px-3 py-4 flex flex-col justify-between">
      <div className="relative w-min">
        <p
          className={`${
            small ? "mt-3 text-2xl font-bold" : "text-5xl"
          } font-light`}
        >
          {value}
        </p>
        <div className="absolute top-0" style={{ left: `calc(100% + 2px)` }}>
          <p className={`${small ? "text-xs" : "text-base"} font-base`}>
            {units}
          </p>
        </div>
      </div>
      <p className="text-sm font-base">{name}</p>
    </div>
  );
};

const lastMeasuredDateOption: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default MainPage;
