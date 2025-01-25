import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Dot from '../../../components/Dot';
import Button from '../../../../../common/Button';
import Typography from '../../../../../common/Typography';
import { withStyles } from '@material-ui/core/styles';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
  } from "recharts";
import chartsData from './mock';

const PieChartData = [
  { name: "New", value: 400 ,color: "#FF4D3A" },
  { name: "In Progress", value: 300 ,color: "#5DC5FF" },
  { name: "Completed", value: 300 ,color: "#1ACA95" },
  { name: "Cancel", value: 200 ,color: "#FEAA4B" }
];

const styles = (theme) => ({
    card: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column"
    },
    alignStandaloneElement: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: 0
    },
    legendItemContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 8,
        paddingLeft: 10
    },
    detailsWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 0,
        paddingLeft: 0,
        width: '100%',
        bottom: 5,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 80,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    topPart: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingRight: 24,
        paddingLeft: 24,
    },
    selectPadding: {
        padding: 10
    },
    inputPosition: {
        transform: 'translate(14px, 12px) scale(1)'
    },
    customizedBtn: {
      color: theme.palette.text.infoTheme,
      borderColor: theme.palette.text.infoTheme
    }
})

const DonutChart = ({ classes, height }) => {
    const [donutData, setDonutData] = useState(chartsData);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    return (
        <Grid container spacing={0}>
          <Grid
            item
            lg={6}
            md={12} xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              padding: 0
            }}
          >
            <Typography
              variant={"caption"}
              weight={"medium"}
              style={{ position: "absolute", top: 100, fontWeight: 'bold', fontSize: 18 }}
            >
              121
            </Typography>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={PieChartData}
                  innerRadius={33}
                  outerRadius={50}
                  dataKey="value"
                >
                  {PieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={""}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item lg={6} md={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={classes.pieChartLegendWrapper}>
              {PieChartData.map(({ name, value, color }, index) => (
                <div key={color} className={classes.legendItemContainer}>
                  <Dot color={color} style={{ marginRight: 5 }} />
                  <Typography
                    color="text"
                    colorBrightness={"hint"}
                    variant={"caption"}
                    style={{ fontSize: 14 }}
                    noWrap
                  >
                    &nbsp;{name}&nbsp;
                  </Typography>
                </div>
              ))}
            </div>
          </Grid>
          <div className={classes.detailsWrapper}>
            <Button color="transparent" classes={{ root: classes.customizedBtn }}>DETAILS</Button>
          </div>
          
        </Grid>

    )
}

export default withStyles(styles)(DonutChart);