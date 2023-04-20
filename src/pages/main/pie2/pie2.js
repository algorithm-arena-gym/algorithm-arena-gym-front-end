import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Donut2Chart({ chartData }) {
    const options = {
        cutout: "85%", // set the cutout value 
        plugins: {
            legend: {
              display: false,
            },
          },
    };


    return <Doughnut data={chartData} options={options} />;
}

export default Donut2Chart;






