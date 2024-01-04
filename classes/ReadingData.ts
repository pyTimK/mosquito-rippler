import { FieldValue, serverTimestamp } from "firebase/firestore";

export interface ReadingData {
  frequency: number;
  lat: number;
  long: number;
  left: boolean;
  right: boolean;
  voltage: number;
  geo_lat: number;
  geo_long: number;
  geo_radius: number;
  male_max_frequency: number;
  male_min_frequency: number;
  female_max_frequency: number;
  female_min_frequency: number;
  count: { [key: string]: number };
  reverse: boolean;
  air_pump: number;
}

export const constructEmptyReadingData = (): ReadingData => {
  return {
    frequency: 0,
    lat: 0,
    long: 0,
    left: false,
    right: false,
    voltage: 0,
    geo_lat: 0,
    geo_long: 0,
    geo_radius: 0,
    male_max_frequency: 0,
    male_min_frequency: 0,
    female_max_frequency: 0,
    female_min_frequency: 0,
    count: {},
    reverse: false,
    air_pump: 0,
  } as ReadingData;
};
