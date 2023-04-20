import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function DonutChart({ chartData }) {
    const options = {
        cutout: "85%",
        plugins: {
            legend: {
                display: false,
            },
        },
        layout: {
            padding: 10
        },
        title: {
            display: true,
            text: 'Custom Chart Title',
            textAlign: "center",
            font: {
                size: 24,
                color: "white",
            }

        }
    }

        return<Doughnut data = { chartData } options = { options } />;
}

export default DonutChart;