import { ReadingData, constructEmptyReadingData } from "@/classes/ReadingData";
import useFirestoreData, { FirestoreDataType } from "@/hooks/useFirestoreData";
import { User } from "firebase/auth";
import { createContext, useState } from "react";
import { doc } from "firebase/firestore";
import { db } from "../firebase";
import MainPage from "./MainPage";
import SettingsPage from "./SettingsPage";

export const PagesWrapperContext = createContext({
  user: {} as User,
  setShowSettingsWithEnd: (show: boolean, end?: boolean) => {},
  readingData: {} as FirestoreDataType<ReadingData>,
});

interface PagesWrapperProps {
  user: User;
}

const PagesWrapper: React.FC<PagesWrapperProps> = ({ user }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showSettingsEnd, setShowSettingsEnd] = useState(false);

  const setShowSettingsWithEnd = (show: boolean, end = false) => {
    setShowSettings(show);
    setShowSettingsEnd(end);
  };

  const readingData = useFirestoreData(
    doc(db, "data", "data"),
    constructEmptyReadingData
  );

  console.log(readingData);

  return (
    <PagesWrapperContext.Provider
      value={{ user, readingData, setShowSettingsWithEnd }}
    >
      {showSettings && <SettingsPage end={showSettingsEnd} />}
      {!showSettings && <MainPage />}
    </PagesWrapperContext.Provider>
  );
};

export default PagesWrapper;
