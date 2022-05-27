import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
// import { Chart as ChartJS } from "react-chartjs-2";

function DoughnutChart({ chartData }) {
  return <Doughnut data={chartData} />;
}

export default DoughnutChart;
