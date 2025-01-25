import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import ReactApexChart from "react-apexcharts";
import { Box } from "@material-ui/core";

// components
import Widget from "../../components/Widget";
import Button from '../../../../common/Button';

const themeOptions = theme => {
  return {
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ],
    colors: [
      theme.palette.text.primaryTheme,
      theme.palette.text.successTheme,
      theme.palette.text.infoTheme,
      theme.palette.text.errorTheme,
      theme.palette.text.secondaryTheme
    ],
    options: {
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      colors: [
        theme.palette.text.primaryTheme,
        theme.palette.text.successTheme,
        theme.palette.text.infoTheme,
        theme.palette.text.errorTheme,
        theme.palette.text.warningTheme
      ]
    },
    options2: {
      dataLabels: {
        enabled: false
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }
      ],
      legend: {
        position: "right",
        offsetY: 0,
        height: 230
      },
      colors: [
        theme.palette.text.primaryTheme,
        theme.palette.text.successTheme,
        theme.palette.text.infoTheme,
        theme.palette.text.errorTheme,
        theme.palette.text.secondaryTheme
      ]
    },
    options3: {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      theme: {
        monochrome: {
          enabled: true
        }
      },
      colors: [
        theme.palette.text.primaryTheme,
        theme.palette.text.successTheme,
        theme.palette.text.infoTheme,
        theme.palette.text.errorTheme,
        theme.palette.text.warningTheme
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  };
};

const values = {
  series: [44, 55, 13, 43, 22],
  series2: [44, 55, 41, 17, 15],
  series3: [44, 55, 13, 33],
  series4: [25, 15, 44, 55, 41, 17]
};

export default function Charts(props) {
  const theme = useTheme();
  const [state, setState] = useState(values);
  const appendData = () => {
    var arr = state.series3.slice();
    arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);

    setState({
      ...state,
      series3: arr
    });
  };

  const removeData = () => {
    if (state.series3.length === 1) return;

    var arr = state.series3.slice();
    arr.pop();

    setState({
      ...state,
      series3: arr
    });
  };

  const randomize = () => {
    setState({
      ...state,
      series3: state.series3.map(() => {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      })
    });
  };

  const reset = () => {
    setState({
      ...state,
      series3: [44, 55, 13, 33]
    });
  };

  // local

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Widget title={"Simple Pie"} noBodyPadding>
            <ReactApexChart
              options={themeOptions(theme)}
              series={state.series}
              type="pie"
              height="380"
              stroke={""}
            />
          </Widget>
        </Grid>
        <Grid item md={6} xs={12}>
          <Widget title={"Simple Donut"} noBodyPadding>
            <ReactApexChart
              options={themeOptions(theme).options}
              series={state.series2}
              type="donut"
              height="380"
              stroke={""}
            />
          </Widget>
        </Grid>
        <Grid item md={6} xs={12}>
          <Widget title={"Update Donut"} noBodyPadding>
            <ReactApexChart
              options={themeOptions(theme).options2}
              series={state.series3}
              type="donut"
              height="380"
              stroke={""}
            />
            <Box display={"flex"} flexWrap="wrap" m={3}>
              <Box mt={1} mr={1}>
                <Button
                  onClick={() => randomize()}
                  color="primary"
                >
                  randomize
                </Button>
              </Box>
              <Box mt={1} mr={1}>
                <Button
                  onClick={() => appendData()}
                  color="success"
                >
                  add
                </Button>
              </Box>
              <Box mt={1} mr={1}>
                <Button
                  onClick={() => removeData()}
                  color="warning"
                >
                  remove
                </Button>
              </Box>
              <Box mt={1} mr={1}>
                <Button
                  onClick={() => reset()}
                  color="secondary"
                >
                  reset
                </Button>
              </Box>
            </Box>
          </Widget>
        </Grid>
        <Grid item md={6} xs={12}>
          <Widget title={"Monochrome Pie"} noBodyPadding>
            <ReactApexChart
              options={themeOptions(theme).options}
              series={state.series2}
              type="pie"
              height="380"
              stroke={""}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
