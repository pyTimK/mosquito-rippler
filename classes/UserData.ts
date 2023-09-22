import { FieldValue, serverTimestamp } from "firebase/firestore";

export interface UserData {
  uid: string;
  email: string;
  first_name: string;
  last_name: string;
  sex: string;
  birth_date: Date;
  weight: number;
  height: number;
  temperature: number;
  heart_rate: number;
  blood_oxygen: number;
  blood_pressure_diastolic: number;
  blood_pressure_systolic: number;
  record_date: FieldValue | Date;
  is_measuring: boolean;
  measuring_stage: FieldValue | number;
}

export const constructEmptyUserData = (): UserData => {
  return {
    uid: "",
    email: "",
    first_name: "",
    last_name: "",
    sex: "",
    birth_date: new Date(),
    weight: 0,
    height: 0,
    temperature: 0,
    heart_rate: 0,
    blood_oxygen: 0,
    blood_pressure_diastolic: 0,
    blood_pressure_systolic: 0,
    record_date: serverTimestamp(),
    is_measuring: false,
    measuring_stage: 0,
  } as UserData;
};
