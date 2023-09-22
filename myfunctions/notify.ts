import { toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultOptions = { duration: 2000, type: "error" as TypeOptions };

const notify = (text: string, options?: Partial<typeof defaultOptions>) => {
  options = { ...defaultOptions, ...options };

  toast(text, {
    position: "top-center",
    autoClose: options.duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: options.type,
  });
};

export default notify;
