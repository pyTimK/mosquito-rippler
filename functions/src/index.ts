import { setGlobalOptions } from "firebase-functions/v2";
import { initializeApp } from "firebase-admin/app";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

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
}

initializeApp();
setGlobalOptions({ region: "asia-east1", maxInstances: 10 });

exports.makeuppercase = onDocumentUpdated("data/data", async (event) => {
  if (!event || !event.data) return;

  const newReadingData = event.data.after.data() as ReadingData;
  const oldReadingData = event.data.before.data() as ReadingData;
  const newMosquitoDetectedState = getMosquitoDetectedState(newReadingData);
  const oldMosquitoDetectedState = getMosquitoDetectedState(oldReadingData);

  // logger.info(`newReadingData.count: ${newReadingData.count}`, {
  //   structuredData: true,
  // });
  // logger.info(`newMosquitoDetectedState: ${newMosquitoDetectedState}`, {
  //   structuredData: true,
  // });

  if (newMosquitoDetectedState === oldMosquitoDetectedState) return;

  if (newMosquitoDetectedState === MosquitoDetectedState.NOT_DETECTED) return;

  const newCount = newReadingData.count;
  const suffix =
    newMosquitoDetectedState === MosquitoDetectedState.MALE_DETECTED
      ? "male"
      : "female";
  const keyName = `${getTodayDateFormatted()}-${suffix}`;

  // logger.info(`newCount: ${newCount}`, {
  //   structuredData: true,
  // });

  if (newCount[keyName]) {
    newCount[keyName] += 1;
  } else {
    newCount[keyName] = 1;
  }

  // logger.info(`data: ${data}`, {
  //   structuredData: true,
  // });

  return event.data.after.ref.set({ count: newCount }, { merge: true });
});

function getTodayDateFormatted() {
  const day = new Date();
  // convert to +8:00 gnt time
  day.setHours(day.getHours() + 8);

  const formattedDate = day.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formattedDate;
}

const enum MosquitoDetectedState {
  NOT_DETECTED = 0,
  MALE_DETECTED = 1,
  FEMALE_DETECTED = 2,
}

function getMosquitoDetectedState(readingData: ReadingData) {
  const {
    frequency,
    male_max_frequency,
    male_min_frequency,
    female_max_frequency,
    female_min_frequency,
  } = readingData;

  if (male_min_frequency <= frequency && frequency <= male_max_frequency) {
    return MosquitoDetectedState.MALE_DETECTED;
  }

  if (female_min_frequency <= frequency && frequency <= female_max_frequency) {
    return MosquitoDetectedState.FEMALE_DETECTED;
  }

  return MosquitoDetectedState.NOT_DETECTED;
}
