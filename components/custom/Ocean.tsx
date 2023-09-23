import useLeftScreenHeight from "@/hooks/useLeftScreenHeight";
import Device from "./Device";
import MosquitoDeadPond from "./MosquitoDeadPond";
import Bubbles from "./Bubbles";

interface OceanInterface {}

const Ocean: React.FC<OceanInterface> = ({}) => {
  const { divRef, leftHeight } = useLeftScreenHeight();

  return (
    <div
      ref={divRef}
      className="relative flex flex-col items-center justify-center w-full py-16 overflow-hidden bg-gradient-to-tl from-light_blue to-blue"
      style={{ minHeight: leftHeight }}
    >
      <div className="absolute w-12 top-6 left-1">
        <MosquitoDeadPond />
      </div>
      <div className="absolute w-20 bottom-20 -right-8">
        <MosquitoDeadPond />
      </div>
      <div className="absolute -right-12 -bottom-5">
        <Bubbles />
      </div>
      <Device />
    </div>
  );
};

export default Ocean;
