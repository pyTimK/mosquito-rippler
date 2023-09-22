import MyInput from "@/components/MyInput";
import SizedBox from "@/components/SizedBox";
import { interFont } from "@/styles/fonts";
import { useContext, useEffect, useRef, useState } from "react";
import MyDatePicker from "@/components/MyDatePicker";
import MyDropDownPicker from "@/components/MyDropdownPicker";
import MyButton from "@/components/MyButton";
import { MainPageContext } from "../main";
import notify from "@/myfunctions/notify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserData } from "@/classes/UserData";

const sexOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

interface RegisterPageProps {
  isEditingUserData: boolean;
  setIsEditingUserData: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  isEditingUserData,
  setIsEditingUserData,
}) => {
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState(new Date(1995, 0, 1));
  const [sexDropdownValue, setSexDropdownValue] = useState<
    string | undefined
  >();

  const [errorFirstNameInput, setErrorFirstNameInput] = useState(false);
  const [errorLastNameInput, setErrorLastNameInput] = useState(false);
  const [sexDropdownError, setSexDropdownError] = useState(false);

  const { user, userData } = useContext(MainPageContext);

  useEffect(() => {
    if (userData.uid) {
      if (firstNameInputRef.current) {
        firstNameInputRef.current.value = userData.first_name;
      }

      if (lastNameInputRef.current) {
        lastNameInputRef.current.value = userData.last_name;
      }

      setStartDate(userData.birth_date);
      setSexDropdownValue(userData.sex);
    }
  }, [userData]);

  function updateUserData() {
    let firstName = firstNameInputRef.current?.value;
    let lastName = lastNameInputRef.current?.value;

    if (!firstName) {
      notify("Please Enter your First Name");
      setErrorFirstNameInput(true);
      return;
    }

    if (!lastName) {
      notify("Please Enter your Last Name");
      setErrorLastNameInput(true);
      return;
    }

    if (!sexDropdownValue) {
      notify("Please Enter your Sex");
      setSexDropdownError(true);
      return;
    }

    firstName = firstName.trim();
    lastName = lastName.trim();

    if (isEditingUserData) {
      userData.updateData({
        first_name: firstName,
        last_name: lastName,
        birth_date: startDate,
        sex: sexDropdownValue,
      });
      setIsEditingUserData(false);
    } else {
      const newUserData: UserData = {
        uid: user.uid,
        email: user.email!,
        first_name: firstName,
        last_name: lastName,
        birth_date: startDate,
        sex: sexDropdownValue,
        blood_oxygen: 0,
        blood_pressure_diastolic: 0,
        blood_pressure_systolic: 0,
        heart_rate: 0,
        height: 0,
        weight: 0,
        record_date: serverTimestamp(),
        temperature: 0,
        is_measuring: false,
        measuring_stage: 0,
      };
      setDoc(doc(db, "users", user.uid), newUserData);
    }
  }

  return (
    <div className="min-h-screen bg-darker_primary px-8">
      <p className={`${interFont} text-white font-bold text-5xl pt-16`}>
        {isEditingUserData ? "Edit Info" : "Register"}
      </p>
      <p className={`${interFont} text-white font-medium text-xl pt-12 pb-2`}>
        Name
      </p>
      <MyInput
        borderColor="border-white"
        className="bg-transparent border-2 text-white border-white placeholder-white w-full"
        error={errorFirstNameInput}
        onChange={() => setErrorFirstNameInput(false)}
        innerRef={firstNameInputRef}
        placeholder="First Name"
      />
      <SizedBox height={30} />
      <MyInput
        borderColor="border-white"
        className="bg-transparent border-2 text-white border-white placeholder-white w-full"
        error={errorLastNameInput}
        onChange={() => setErrorLastNameInput(false)}
        innerRef={lastNameInputRef}
        placeholder="Last Name"
      />
      <p className={`${interFont} text-white font-medium text-xl pt-16 pb-2`}>
        Birth Date
      </p>
      <MyDatePicker date={startDate} setDate={setStartDate} />
      <p className={`${interFont} text-white font-medium text-xl pt-16 pb-2`}>
        Sex
      </p>
      <div className={`${interFont} w-32 mb-16`}>
        <MyDropDownPicker
          value={sexDropdownValue}
          setValue={setSexDropdownValue}
          options={sexOptions}
          error={sexDropdownError}
          onChange={() => setSexDropdownError(false)}
        />
      </div>
      <div className="flex m-auto">
        <MyButton
          onClick={updateUserData}
          label={`${isEditingUserData ? "Update" : "Register"}`}
          color="bg-white"
          textColor="text-darkest_primary"
          fontWeight="font-bold"
          pX={4}
          pY={1}
          notRounded
        />
      </div>
    </div>
  );
};

export default RegisterPage;
