import { Colors } from "@/styles/styles";
import { useState } from "react";
import { RingLoader } from "react-spinners";

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex items-center justify-center h-screen">
      <RingLoader
        color={`${Colors.darker_primary}`}
        loading={loading}
        size={150}
      />
    </div>
  );
};

export default LoadingPage;
