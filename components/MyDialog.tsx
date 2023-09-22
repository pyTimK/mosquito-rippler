import React, { MutableRefObject, useRef, useState } from "react";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import notify from "@/myfunctions/notify";

interface MyDialogProps {
  children?: React.ReactNode;
  showDialog: boolean;
  title: string;
  initialValue: string;
  units: string;
  onSaveCallbackRef: MutableRefObject<(val: number) => void>;
  closeDialog: () => void;
}

const MyDialog: React.FC<MyDialogProps> = ({
  showDialog,
  title,
  initialValue,
  units,
  onSaveCallbackRef,
  closeDialog,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  function handleOnSave() {
    const input = inputRef.current?.value;
    if (input === undefined || input === "") {
      setError(true);
      notify(`Enter a valid ${title}`);
      return;
    }

    const inputNum = parseInt(input);
    if (isNaN(inputNum)) {
      setError(true);
      notify(`Enter a valid number`);
      return;
    }
    onSaveCallbackRef.current(inputNum);
    closeDialog();
  }

  return showDialog ? (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 z-30 bg-semi_transparent flex"
      onClick={closeDialog}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-48 w-80 m-auto bg-white border rounded-2xl flex items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center space-y-3 w-full">
          <p className="text-2xl">
            {title} ({units})
          </p>
          <div className="flex flex-row items-center space-x-3">
            <div className="w-32 text-3xl">
              <MyInput
                placeholder={initialValue}
                innerRef={inputRef}
                bg="white"
                type="number"
                error={error}
                onChange={() => setError(false)}
              />
            </div>
          </div>
          <div className="flex justify-end w-full px-5">
            <MyButton
              label="Cancel"
              noMargin
              textColor="text-gray-500"
              outline
              onClick={closeDialog}
            />
            <MyButton
              label="Save"
              noMargin
              textColor="text-white"
              color="bg-red"
              onClick={handleOnSave}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MyDialog;
