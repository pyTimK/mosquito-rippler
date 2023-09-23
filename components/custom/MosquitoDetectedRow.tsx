import { jsoFont } from "@/styles/fonts";
import MosquitoAlive from "./MosquitoAlive";
import Flip from "../templates/Flip";
import { twMerge } from "tailwind-merge";
import { useContext } from "react";
import { ReadingData } from "@/classes/ReadingData";
import MosquitoDetectedState from "@/enums/MosquitoDetectedState";
import { PagesWrapperContext } from "@/app/pages/PagesWrapper";

interface MosquitoDetectedRowInterface {}

const MosquitoDetectedRow: React.FC<MosquitoDetectedRowInterface> = ({}) => {
  const { readingData } = useContext(PagesWrapperContext);
  const mosquitoDetectedState = getMosquitoDetectedState(readingData);
  const isMale = mosquitoDetectedState === MosquitoDetectedState.MALE_DETECTED;
  const isFemale =
    mosquitoDetectedState === MosquitoDetectedState.FEMALE_DETECTED;

  return (
    <div className="flex items-center justify-center w-full gap-5 py-1 mt-10 text-white bg-orange">
      <MosquitoAlive />
      <p
        className={twMerge("text-sm w-7/12 text-center animate-pulse", jsoFont)}
      >
        {isMale
          ? "MALE MOSQUITO DETECTED"
          : isFemale
          ? "FEMALE MOSQUITO DETECTED"
          : ""}
      </p>
      <Flip>
        <MosquitoAlive />
      </Flip>
    </div>
  );
};

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

export default MosquitoDetectedRow;
