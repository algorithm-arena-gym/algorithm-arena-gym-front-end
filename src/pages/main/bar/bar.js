import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  const options = {
    scales: {
      x: {
        ticks: {
          color: 'slate-950',

        },
        grid: {
          color: 'slate-950',
        }
      },
      y: {
        ticks: {
          color: 'slate-950'
        },
        grid: {
          color: 'slate-950',

        },


      }
    },


  }


  return <Bar data={chartData} options={options} />;
}

export default BarChart;