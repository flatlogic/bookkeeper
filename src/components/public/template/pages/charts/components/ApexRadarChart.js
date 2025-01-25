import React, { useState } from "react";
import { useTheme } from "@material-ui/styles";
import ReactApexChart from "react-apexcharts";

const themeOptions = theme => {
  return {
    options: {
      labels: ["January", "February", "March", "April", "May", "June"],
    },
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 100, 20],
      },
    ],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    labels: ["January", "February", "March", "April", "May", "June"],
    fill: {
      colors: [theme.palette.text.primaryTheme, theme.palette.text.primaryTheme],
    },
    colors: [theme.palette.text.primaryTheme, theme.palette.text.primaryTheme],
  };
};

const values = {
  series: [
    {
      name: "Series 1",
      data: [80, 50, 30, 40, 100, 20],
    },
  ],
};

const ApexRadarChart = () => {
  const theme = useTheme();
  const [state] = useState(values);
  return (
    <ReactApexChart
      options={themeOptions(theme)}
      series={state.series}
      type="radar"
      height="350"
    />
  );
};

export default ApexRadarChart;
