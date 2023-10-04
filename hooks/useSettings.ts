import { PagesWrapperContext } from "@/app/pages/PagesWrapper";
import notify from "@/myfunctions/notify";
import { useContext, useEffect, useState } from "react";
import useMyInput from "./useMyInput";
import { FirestoreDataType } from "./useFirestoreData";
import { ReadingData } from "@/classes/ReadingData";

function useSettingsPage() {
  const { setShowSettingsWithEnd, readingData } =
    useContext(PagesWrapperContext);

  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function backHandler() {
    if (saveButtonEnabled) {
      openModal();
    } else {
      exitPage();
    }
  }

  //! DISABLE BACK DEFAULT BEHAVIOUR
  useEffect(() => {
    // Listen for the back button click
    const handleBackButton = (e: PopStateEvent) => {
      window.history.pushState(null, "", window.location.href);
      e.preventDefault();
      console.log("BACK TRIGGERED");
      backHandler();
    };

    window.history.pushState(null, "", window.location.href);

    window.addEventListener("popstate", handleBackButton);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  function exitPage() {
    setShowSettingsWithEnd(false);
  }

  const useFrequencyInput = (isMale: boolean, isMin: boolean) => {
    const defaultValue = getFrequency(readingData, isMale, isMin);

    const title = `${isMale ? "Male" : "Female"} ${
      isMin ? "Minimum" : "Maximum"
    } Frequency`;

    return useMyInput(`${defaultValue}`, (value) => {
      if (!value) {
        notify(`${title} Frequency required`);
        return false;
      }

      const floatvalue = parseFloat(value);

      if (floatvalue < 0) {
        notify(`${title} cannot be negative`);
        return false;
      }

      return true;
    });
  };

  const maleMinFreqInput = useFrequencyInput(true, true);
  const maleMaxFreqInput = useFrequencyInput(true, false);
  const femaleMinFreqInput = useFrequencyInput(false, true);
  const femaleMaxFreqInput = useFrequencyInput(false, false);

  const longitudeInput = useMyInput(`${readingData.geo_long}`, (value) => {
    if (!value) {
      notify("Longitude required");
      return false;
    }

    const floatValue = parseFloat(value);

    if (floatValue < -180 || floatValue > 180) {
      notify("Longitude must be between -180 and 180");
      return false;
    }

    return true;
  });

  const latitudeInput = useMyInput(`${readingData.geo_lat}`, (value) => {
    if (!value) {
      notify("Latitude required");
      return false;
    }

    const floatValue = parseFloat(value);

    if (floatValue < -90 || floatValue > 90) {
      notify("Latitude must be between -90 and 90");
      return false;
    }

    return true;
  });

  const radiusInput = useMyInput(`${readingData.geo_radius}`, (value) => {
    if (!value) {
      notify("Radius required");
      return false;
    }

    const floatValue = parseFloat(value);

    if (floatValue < 0) {
      notify("Radius cannot be negative");
      return false;
    }

    return true;
  });

  const updateReadingData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verifiedAllFields =
      maleMinFreqInput.verify() &&
      maleMaxFreqInput.verify() &&
      femaleMinFreqInput.verify() &&
      femaleMaxFreqInput.verify() &&
      longitudeInput.verify() &&
      latitudeInput.verify() &&
      radiusInput.verify();

    if (verifiedAllFields) {
      const updateRequest = readingData.updateData({
        male_min_frequency: maleMinFreqInput.getFloat(),
        male_max_frequency: maleMaxFreqInput.getFloat(),
        female_min_frequency: femaleMinFreqInput.getFloat(),
        female_max_frequency: femaleMaxFreqInput.getFloat(),
        geo_long: longitudeInput.getFloat(),
        geo_lat: latitudeInput.getFloat(),
        geo_radius: radiusInput.getFloat(),
      });

      updateRequest.then(() => {
        notify("Settings updated", { type: "success" });
        setSaveButtonEnabled(false);
      });
    }
  };

  return {
    saveButtonEnabled,
    setSaveButtonEnabled,
    exitPage,
    maleMinFreqInput,
    maleMaxFreqInput,
    femaleMinFreqInput,
    femaleMaxFreqInput,
    longitudeInput,
    latitudeInput,
    radiusInput,
    updateReadingData,
    readingData,
    modalIsOpen,
    setModalIsOpen,
    openModal,
    closeModal,
    backHandler,
  };
}

function getFrequency(
  readingData: FirestoreDataType<ReadingData>,
  isMale: boolean,
  isMin: boolean
) {
  if (isMale) {
    if (isMin) return readingData.male_min_frequency;
    else return readingData.male_max_frequency;
  } else {
    if (isMin) return readingData.female_min_frequency;
    return readingData.female_max_frequency;
  }
}

export default useSettingsPage;
