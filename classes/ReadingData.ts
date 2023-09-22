import { FieldValue, serverTimestamp } from "firebase/firestore";

export interface ReadingData {
  weight: number;
  height: number;
  temperature: number;
  heart_rate: number;
  blood_oxygen: number;
  blood_pressure_diastolic: number;
  blood_pressure_systolic: number;
  record_date: FieldValue | Date;
}

export const constructEmptyReadingData = (): ReadingData => {
  return {
    weight: 0,
    height: 0,
    temperature: 0,
    heart_rate: 0,
    blood_oxygen: 0,
    blood_pressure_diastolic: 0,
    blood_pressure_systolic: 0,
    record_date: serverTimestamp(),
  } as ReadingData;
};
