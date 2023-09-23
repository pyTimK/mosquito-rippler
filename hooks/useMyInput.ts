import { useEffect, useRef, useState } from "react";

const useMyInput = (
  defaultValue: string,
  verifyInput: (value: string | undefined) => boolean
) => {
  const ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.value = defaultValue;
    }
  }, [defaultValue]);

  const verify = () => {
    const value = ref.current?.value;

    if (!verifyInput(value)) {
      setError(true);
      return false;
    }

    setError(false);
    return true;
  };

  const getValue = () => {
    return ref.current?.value;
  };

  const getInt = () => {
    return parseInt(ref.current?.value || "0");
  };

  const getFloat = () => {
    return parseFloat(ref.current?.value || "0");
  };

  return {
    ref,
    error,
    setError,
    verify,
    getValue,
    getInt,
    getFloat,
    defaultValue,
  };
};

export default useMyInput;
