import CheckIcon from "@/components/svg/CheckIcon";
import DemoPoseWeighing from "@/components/svg/DemoPoseWeighing";
import ProgressMeasuring from "@/components/svg/ProgressMeasuring";
import { interFont } from "@/styles/fonts";
import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { RingLoader } from "react-spinners";
import { HealthGrid, MainPageContext } from "../main";
import DemoPoseHeight from "@/components/svg/DemoPoseHeight";
import DemoPoseVitals from "@/components/svg/DemoPoseVitals";
import DemoPoseBP from "@/components/svg/DemoPoseBP";
import VitalsLine from "@/components/svg/VitalsLine";
import WheelPicker, { PickerData } from "react-simple-wheel-picker";
import MyButton from "@/components/MyButton";
import {
  Timestamp,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { DeviceData } from "@/classes/DeviceData";
import { UserData } from "@/classes/UserData";
import notify from "@/myfunctions/notify";
import { DevicePageContext } from "../device";
import { FirestoreDataType } from "@/hooks/useFirestoreData";
import { Constants } from "../constants";
import Modal from "react-modal";
import formatNumber from "@/myfunctions/formatNumber";
import getAge from "@/myfunctions/getAge";

// create data; make it dynamic and up to x amount of numbers
const diastolicData: PickerData[] = [];
const diastolicDataMin = 40;
const diastolicDataMax = 200;
for (let i = diastolicDataMin; i <= diastolicDataMax; i++) {
  diastolicData.push({ id: i.toString(), value: i.toString() });
}

const systolicData: PickerData[] = [];
const systolicDataMin = 0;
const systolicDataMax = 120;
for (let i = systolicDataMin; i <= systolicDataMax; i++) {
  systolicData.push({ id: i.toString(), value: i.toString() });
}

const fetchFromFlask = async (url_path: string, queryParams = "") => {
  try {
    const url = `http://127.0.0.1:5000/${url_path}?${queryParams}`;
    const res = await fetch(url);
    console.log("res");
    console.log(res);
    const data = await res.text();
    console.log(`FETCHED ${url_path}: ${data}`);
    return data;
  } catch (_e) {
    console.log("ERROR FETCHING");
    console.log(_e);
    return "";
  }
};

const closeMeasuringStage = (userData: FirestoreDataType<UserData>) => {
  setDoc(doc(db, "devices", Constants.qrCode), {
    is_measuring: false,
    user_id: "",
  } as DeviceData);

  userData.updateData({
    measuring_stage: 0,
    is_measuring: false,
  });
};

export const MeasuringPageWrapperContext = createContext({
  isDevice: false,
  userData: {} as FirestoreDataType<UserData>,
  deviceData: {} as FirestoreDataType<DeviceData>,
});

interface MeasuringPageWrapperProps {
  isDevice: boolean;
}

const MeasuringPageWrapper: React.FC<MeasuringPageWrapperProps> = ({
  isDevice,
}) => {
  const { userData: userDataFromUser } = useContext(MainPageContext);
  const { deviceData, userData: userDataFromDevice } =
    useContext(DevicePageContext);

  const userData = isDevice ? userDataFromDevice : userDataFromUser;

  return (
    <MeasuringPageWrapperContext.Provider
      value={{ isDevice, userData, deviceData }}
    >
      <MeasuringPage />
    </MeasuringPageWrapperContext.Provider>
  );
};

interface MeasuringPageProps {}

const MeasuringPage: React.FC<MeasuringPageProps> = () => {
  const { isDevice, userData } = useContext(MeasuringPageWrapperContext);
  console.log(userData);
  // useEffect(() => {
  //   if (isDevice) {
  //     fetch("http://127.0.0.1:5000/temp")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    console.log("WAWYeffect");
    if (isDevice) {
      switch (userData.measuring_stage) {
        case 0:
          fetchFromFlask("weight_init").then((data) => {
            userData.updateData({
              measuring_stage: 1,
              record_date: serverTimestamp(),
            });
          });
          break;

        case 1:
          fetchFromFlask("weight").then((data) => {
            const weight = parseFloat(data);
            userData.updateData({
              measuring_stage: 2,
              weight,
            });
          });
          break;

        case 2:
          setTimeout(() => {
            userData.updateData({
              measuring_stage: 3,
            });
          }, 3000);
          break;

        case 3:
          fetchFromFlask("height_init").then((data) => {
            userData.updateData({
              measuring_stage: 4,
            });
          });
          break;

        case 4:
          fetchFromFlask("height").then((data) => {
            const height = parseFloat(data);
            userData.updateData({
              measuring_stage: 5,
              height,
            });
          });
          break;

        case 5:
          setTimeout(() => {
            userData.updateData({
              measuring_stage: 6,
            });
          }, 3000);
          break;

        case 6:
          fetchFromFlask("vitals_init").then((data) => {
            userData.updateData({
              measuring_stage: 7,
            });
          });
          break;

        case 7:
          fetchFromFlask("vitals").then((data) => {
            // parse the string "temperature,blood_oxygen,heart_rate"

            const [temperature_str, heart_rate_str, blood_oxygen_str] =
              data.split(" ");

            console.log("--------------------------------------------data");
            console.log(data);
            console.log(data.split(" "));
            console.log(temperature_str);
            console.log(heart_rate_str);
            console.log(blood_oxygen_str);

            const temperature = parseFloat(temperature_str);
            const heart_rate = parseInt(heart_rate_str);
            const blood_oxygen = parseInt(blood_oxygen_str);

            userData.updateData({
              measuring_stage: 8,
              temperature,
              heart_rate,
              blood_oxygen,
            });
          });
          break;

        case 8:
          setTimeout(() => {
            userData.updateData({
              measuring_stage: 9,
            });
          }, 3000);
          break;

        case 9:
          const queryParams = new URLSearchParams({
            age: `${getAge(userData.birth_date)}`,
            weight: `${userData.weight}`,
            height: `${userData.height}`,
            temp: `${userData.temperature}`,
            heart_rate: `${userData.heart_rate}`,
            spo2: `${userData.blood_oxygen}`,
          }).toString();

          fetchFromFlask("bp", queryParams).then((data) => {
            // parse the string "temperature,blood_oxygen,heart_rate"

            const [sbp_str, dbp_str] = data.split(" ");

            const sbp = parseFloat(sbp_str);
            const dbp = parseFloat(dbp_str);

            userData.updateData({
              measuring_stage: 10,
              blood_pressure_systolic: sbp,
              blood_pressure_diastolic: dbp,
            });
          });
          break;

        default:
      }
    }

    // if ((userData.measuring_stage as number) > 9) {
    //   userData.updateData({
    //     measuring_stage: 0,
    //     is_measuring: false,
    //   });
    // }
  }, [userData.measuring_stage]);

  console.log(userData.measuring_stage);

  switch (userData.measuring_stage) {
    case 0:
      return (
        <WeighingDesign>
          <p className="text-2xl text-center">
            Please stand on the weighing scale
          </p>
        </WeighingDesign>
      );

    case 1:
      return (
        <WeighingDesign isMeasuring>
          <p className="text-2xl text-center">Measuring...</p>
        </WeighingDesign>
      );

    case 2:
      return (
        <WeighingDesign isDone>
          <DataWithUnit data={userData.weight} unit="kg" />
        </WeighingDesign>
      );

    case 3:
      return (
        <HeightDesign>
          <p className="text-2xl text-center">
            Place the ruler on top of your head and press the button
          </p>
        </HeightDesign>
      );

    case 4:
      return (
        <HeightDesign isMeasuring>
          <p className="text-2xl text-center">Measuring...</p>
        </HeightDesign>
      );

    case 5:
      return (
        <HeightDesign isDone>
          <DataWithUnit data={userData.height} unit="cm" />
        </HeightDesign>
      );

    case 6:
      return (
        <VitalsDesign>
          <p className="text-2xl text-center">
            Place your hand at the vitals pad. It would measure your temperature
            automatically. Waiting for hand..
          </p>
        </VitalsDesign>
      );

    case 7:
      return (
        <VitalsDesign isMeasuring>
          <p className="text-2xl text-center">Measuring</p>
        </VitalsDesign>
      );

    case 8:
      return (
        <VitalsDesign isDone>
          <div className="relative">
            <VitalsLine />
            <div className="absolute top-10 right-52">
              <DataWithUnit
                data={userData.temperature}
                unit="°C"
                titleSize="text-4xl"
              />
            </div>
            <div className="absolute top-10 left-40">
              <DataWithUnit
                data={userData.blood_oxygen}
                unit="%"
                titleSize="text-4xl"
              />
            </div>
            <div className="absolute top-30 left-20">
              <DataWithUnit
                data={userData.heart_rate}
                unit="bpm"
                titleSize="text-4xl"
              />
            </div>
          </div>
        </VitalsDesign>
      );

    case 9:
      // return <BPDesignImplement />;
      return (
        <BPDesign isMeasuring>
          <p className="text-2xl text-center">
            Calculating your blood pressure
          </p>
        </BPDesign>
      );

    case 10:
      return (
        <div className="flex flex-col space-y-10 mt-10">
          <p className="text-2xl text-center">Complete</p>
          <HealthGrid userData={userData} />
          <div className="w-full flex mt-8">
            <MyButton
              label="RETURN"
              color="bg-white"
              textColor="text-darker_primary"
              pX={1}
              pY={0.6}
              notRounded
              onClick={() => closeMeasuringStage(userData)}
            />
          </div>
        </div>
      );

    default:
      return <></>;
  }
};

const BPDesignImplement: React.FC = () => {
  const [diastolic, setDiastolic] = useState(110);
  const [systolic, setSystolic] = useState(70);

  const handleOnBPSubmit = async () => {
    const deviceDocSnapshot = await getDoc(
      doc(db, "devices", "smartmedicalkiosk_device1")
    );
    const deviceDoc = deviceDocSnapshot.data() as DeviceData;
    if (!deviceDoc.user_id) {
      console.log("No user_id");
      notify("No user_id");
      return;
    }

    updateDoc(doc(db, "users", deviceDoc.user_id), {
      blood_pressure_diastolic: diastolic,
      blood_pressure_systolic: systolic,
      measuring_stage: 10,
    } as Partial<UserData> & { measuring_stage: any });
  };
  return (
    <BPDesign>
      <p className="text-2xl text-center">Measure your blood pressure</p>
      <div className="flex justify-center items-center space-x-8 mt-10">
        <div className="flex flex-col">
          <WheelPicker
            data={diastolicData}
            idName="wheelpicker"
            onChange={(data) => {
              setDiastolic(parseInt(data.id));
            }}
            height={100}
            width={60}
            itemHeight={30}
            selectedID="110"
            color="#000"
            shadowColor="transparent"
            activeColor="red"
            backgroundColor="transparent"
          />
          <p className={`${interFont} mt-3`}>Diastolic</p>
        </div>
        <p className="text-7xl font-light">/</p>
        <div className="flex flex-col">
          <WheelPicker
            data={systolicData}
            idName="wheelpicker2"
            onChange={(data) => {
              setSystolic(parseInt(data.id));
            }}
            height={100}
            width={60}
            itemHeight={30}
            selectedID="70"
            color="#000"
            shadowColor="transparent"
            activeColor="red"
            backgroundColor="transparent"
          />
          <p className={`${interFont} mt-3`}>Systolic</p>
        </div>
      </div>
      <div className="w-full flex mt-8">
        <MyButton
          label="SUBMIT"
          color="bg-white"
          textColor="text-darker_primary"
          pX={1}
          pY={0.6}
          notRounded
          onClick={handleOnBPSubmit}
        />
      </div>
    </BPDesign>
  );
};

interface DataWithUnitProps {
  data: number;
  unit: string;
  titleSize?: string;
}

const DataWithUnit: React.FC<DataWithUnitProps> = ({
  data,
  unit,
  titleSize = "text-7xl",
}) => {
  return (
    <div className="relative w-min m-auto">
      <p className={`${titleSize} font-light text-center`}>
        {formatNumber(data)}
      </p>
      <div className="absolute top-0" style={{ left: `calc(100% + 2px)` }}>
        <p className="text-xl font-base">{unit}</p>
      </div>
    </div>
  );
};

//! WEIGHING
interface WeighingDesignProps {
  children: React.ReactNode;
  isMeasuring?: boolean;
  isDone?: boolean;
}

const WeighingDesign: React.FC<WeighingDesignProps> = ({
  isMeasuring = false,
  isDone = false,
  children,
}) => {
  return (
    <BaseDesign
      title="Weighing"
      poseSvg={<DemoPoseWeighing />}
      isMeasuring={isMeasuring}
      isDone={isDone}
      level={1}
    >
      {children}
    </BaseDesign>
  );
};

//! HEIGHT
interface HeightDesignProps {
  children: React.ReactNode;
  isMeasuring?: boolean;
  isDone?: boolean;
}

const HeightDesign: React.FC<HeightDesignProps> = ({
  isMeasuring = false,
  isDone = false,
  children,
}) => {
  return (
    <BaseDesign
      title="Height"
      poseSvg={<DemoPoseHeight />}
      isMeasuring={isMeasuring}
      isDone={isDone}
      level={2}
    >
      {children}
    </BaseDesign>
  );
};

//! VITALS
interface VitalsDesignProps {
  children: React.ReactNode;
  isMeasuring?: boolean;
  isDone?: boolean;
}

const VitalsDesign: React.FC<VitalsDesignProps> = ({
  isMeasuring = false,
  isDone = false,
  children,
}) => {
  return (
    <BaseDesign
      title="Temperature,\nHeart Rate,\nBlood Oxygen"
      titleSize="text-3xl"
      poseSvg={<DemoPoseVitals />}
      isMeasuring={isMeasuring}
      isDone={isDone}
      level={3}
    >
      {children}
    </BaseDesign>
  );
};

//! BLOOD PRESSURE
interface BPDesignProps {
  children: React.ReactNode;
  isMeasuring?: boolean;
  isDone?: boolean;
}

const BPDesign: React.FC<BPDesignProps> = ({
  isMeasuring = false,
  isDone = false,
  children,
}) => {
  return (
    <BaseDesign
      title="Blood\nPressure"
      poseSvg={<DemoPoseBP />}
      isMeasuring={isMeasuring}
      isDone={isDone}
      level={4}
    >
      {children}
    </BaseDesign>
  );
};

interface BaseDesign {
  children: React.ReactNode;
  title: string;
  titleSize?: string;
  poseSvg: React.ReactNode;
  isMeasuring: boolean;
  isDone: boolean;
  level: number;
}

const BaseDesign: React.FC<BaseDesign> = ({
  title,
  titleSize = "text-5xl",
  poseSvg,
  isMeasuring,
  isDone,
  children,
  level,
}) => {
  const { userData } = useContext(MeasuringPageWrapperContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <div
      className={`${interFont} w-full min-h-screen bg-darker_primary text-white flex flex-col pt-16  items-center`}
    >
      <BreakByLines message={title} titleSize={titleSize} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center space-y-8">
        <div className="h-64 flex items-end">{poseSvg}</div>
        <div className="w-72 h-64">{children}</div>
      </div>
      {isMeasuring && (
        <div className="absolute bottom-24">
          <RingLoader color="white" />
        </div>
      )}
      {isDone && (
        <div className="absolute bottom-24">
          <CheckIcon />
        </div>
      )}
      <div className="absolute bottom-10">
        <ProgressMeasuring level={level} />
      </div>
      <div
        className="absolute top-4 left-4 text-2xl cursor-pointer"
        onClick={openModal}
      >
        ←
      </div>
      <Modal
        isOpen={modalIsOpen}
        className="absolute bg-darker_primary text-white rounded-xl py-5 px-5 inset-0 w-fit h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <p className="whitespace-nowrap text-2xl font-light mb-5">
          Stop Measuring?
        </p>
        <div className="flex justify-end items-center space-x-8">
          <div className="mr-0">
            <MyButton
              label="No"
              color="bg-transparent"
              textColor="text-white"
              pX={0}
              pY={0}
              notRounded
              onClick={closeModal}
            />
          </div>

          <MyButton
            label="Yes"
            color="bg-white"
            textColor="text-darker_primary"
            pX={0.6}
            pY={0.4}
            onClick={() => {
              closeModal();
              closeMeasuringStage(userData);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

const BreakByLines = ({
  message,
  titleSize,
}: {
  message: string;
  titleSize: string;
}) => {
  // console.log(message);
  // console.log(message.split("\\n"));
  const lines = message.split("\\n").map((line, index) => (
    <Fragment key={index}>
      {line}
      {index < message.split("\\n").length - 1 && <br />}
    </Fragment>
  ));

  return (
    <p className={`${titleSize} whitespace-pre-line text-center font-bold`}>
      {lines}
    </p>
  );
};
export default MeasuringPageWrapper;
