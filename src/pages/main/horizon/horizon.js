import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

function HorizonChart({ chartData }) {

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      }
    },
  }
  return <Bar data={chartData} options={options} />;
}





export default HorizonChart;
