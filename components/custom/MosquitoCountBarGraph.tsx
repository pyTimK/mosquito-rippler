import { useContext } from "react";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Colors } from "@/styles/styles";
import { PagesWrapperContext } from "@/app/pages/PagesWrapper";

interface MosquitoCountBarGraphInterface {}

const MosquitoCountBarGraph: React.FC<
  MosquitoCountBarGraphInterface
> = ({}) => {
  const { readingData } = useContext(PagesWrapperContext);
  const pastFiveDays = getPastFiveDays();

  // print today's timedate
  console.log();

  return (
    <Bar
      className="w-full max-w-4xl px-3 py-2 m-auto mx-3 my-2 border border-gray-600 rounded-lg"
      options={{
        aspectRatio: 1.5,
        responsive: true,
        plugins: {
          legend: {},
          title: {
            display: true,
            color: "#5F5F5F",
            text: "Mosquitoes / Day",
            font: {
              size: 22,
              family: "Arial",
              weight: "bold",
            },
          },
        },
      }}
      data={{
        labels: pastFiveDays.map((day) => day.slice(0, -5)),
        datasets: [
          {
            label: "Female",
            data: pastFiveDays.map(
              (day) => readingData.count[`${day}-female`] ?? 0
            ),
            backgroundColor: Colors.orange,
            // backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Male",
            data: pastFiveDays.map(
              (day) => readingData.count[`${day}-male`] ?? 0
            ),
            backgroundColor: Colors.darker_primary,
            // backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      }}
    />
  );
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function getPastFiveDays() {
  const today = new Date();
  const days = [];

  for (let i = 0; i < 5; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const formattedDate = day.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    days.push(formattedDate);
  }

  days.reverse();

  return days;
}

export default MosquitoCountBarGraph;
