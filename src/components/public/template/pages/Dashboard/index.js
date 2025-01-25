import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReactApexChart from 'react-apexcharts';
import { withStyles } from '@material-ui/core/styles';
import tinycolor from 'tinycolor2';
import withAuthUser from '../../../../../HOC/withAuthUser';

import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import SimpleLine from './widget';
import { BASE_USER_ROLES } from '../../../../../config';
import CompaniesList from '../../../../../containers/admin/Companies/list'
import DesignIcon from './icons/Design';
import MaterialsIcon from './icons/Materials';
import FurnitureIcon from './icons/Furniture';
import { data, dataTwo, dataFour } from './mock';
import Button from '../../../../common/Button';
import Typography from '../../../../common/Typography';

const styles = theme => ({
    widgetBackground: {
        background: "#fff",
        marginBottom: 0,
        padding: '10px 10px 25px 10px',
        [theme.breakpoints.down("sm")]: {
          marginTop: 24,
        },
    },
    gaugeInner: {
      boxShadow: '4px 4px 30px rgba(75, 159, 254, 0.25)',
      width: 88,
      height: 88,
      borderRadius: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& strong': {
        color: theme.palette.activeText,
        fontWeight: 'normal',
        fontSize: 20,
      }
    },
    widgetWrapper: {
      background: "#fff",
      marginBottom: 24,
      padding: 25,
      [theme.breakpoints.down("sm")]: {
        marginBottom: 0,
      },
    },
    circleWidgetWrapper: {
      background: "#fff",
      marginBottom: 0,
      padding: 25,
    },
    widgetTitle: {
      fontSize: 20,
      color: theme.palette.primary.main,
      fontWeight: 'normal',
      margin: 0,
      transition: 'color .35s ease',
    },
    transactionRecord: {
      marginBottom: 25,
      display: 'flex',
      justifyContent: 'space-between',
    },
    transactionInfo: {
      display: 'flex',
    },
    transactionDescription: {
      display: 'flex',
      flexDirection: 'column',
    },
    descrTitle: {
      color: theme.palette.primary.main,
      fontSize: 14,
      lineHeight: '25px',
      opacity: 0.9
    },
    time: {
      color: theme.palette.primary.main,
      fontSize: 14,
      lineHeight: '25px',
      opacity: 0.7
    },
    transactionPrice: {
      color: theme.palette.primary.main,
      fontSize: 16,
      lineHeight: '25px',
      fontWeight: 500,
    },
    transactionIcon: {
      background: tinycolor(theme.palette.activeText).setAlpha(.3),
      borderRadius: 4,
      width: 36,
      height: 36,
      marginRight: 14,
      marginTop: 7,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.activeText
    },
    circularProgress: {
      maxWidth: 155,
      maxHeight: 155,
      width: '100%',
      height: '100%',
      margin: '35px auto',
    },
    adjustTable: {
      border: 'none',
      marginTop: 0
    },
    alignGrid: {
      textAlign: 'right',
    },
    mb2: {
      marginBottom: 20,
    },
    iconBackgroundGreen: {
      background: tinycolor(theme.palette.text.successTheme).setAlpha(.13)
    },
    iconBackgroundRed: {
      background: tinycolor(theme.palette.text.errorTheme).setAlpha(.13)
    },
    iconBackgroundYellow: {
      background: tinycolor(theme.palette.text.warningTheme).setAlpha(.13)
    },
    printButton: {
      '@media print': {
        display: 'none',
      },
    }
})

const Dashboard = ({ classes, _authUser }) => {
    console.log(_authUser)
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="h2" Component="div">Charts of Accounts</Typography>
                </Grid>
                <Grid item xs={6} classes={{root: classes.alignGrid}}>
                  <Button className={classes.printButton} size="large">
                    Download Report
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={9}>
                <Grid container spacing={3}>
                    <Grid item lg={4} sm={6} xs={12}>
                        <SimpleLine color="#4B9FFE" title="Clicks" subtitle="Visitors" value={10.848} />
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <SimpleLine color="#FF4D3A" title="Views" subtitle="Customers" value={10.848} />
                    </Grid>
                    <Grid item lg={4} sm={12} xs={12}>
                        <SimpleLine color="#FEAA4B" title="Retention" subtitle="Clients" value={10.848} />
                    </Grid>
                </Grid>
                <div id="chart" className={classes.widgetBackground}>
                    <ReactApexChart
                      options={data.options}
                      series={data.series}
                      type="line"
                      width="100%"
                      minWidth={300}
                      height={350}
                    />
                </div>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <div className={classes.circleWidgetWrapper}>
                <h2 className={classes.widgetTitle}>Other use cases</h2>
                  <div className={classes.circularProgress}>
                    <CircularProgressbarWithChildren value={66} strokeWidth={2}
                      styles={buildStyles({
                        trailColor: 'rgba(75, 159, 254, 0.2)',
                        pathColor: `rgba(75, 159, 254, 1)`,
                      })}
                    >
                      <div className={classes.gaugeInner}>
                        <strong>66.3%</strong>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <h2 className={`${classes.widgetTitle} ${classes.mb2}`}>Transactions</h2>
                  <div className={classes.transactionsList}>
                    <div className={classes.transactionRecord}>
                      <div className={classes.transactionInfo}>
                        <div className={`${classes.transactionIcon} ${classes.iconBackgroundGreen}`}>
                          <DesignIcon />
                        </div>
                        <div className={classes.transactionDescription}>
                          <span className={classes.descrTitle}>Design</span>
                          <span className={classes.time}>11.43PM</span>
                        </div>
                      </div>
                      <span className={classes.transactionPrice}>-$10.23</span>
                    </div>
                    <div className={classes.transactionRecord}>
                      <div className={classes.transactionInfo}>
                        <div className={`${classes.transactionIcon} ${classes.iconBackgroundRed}`}>
                          <MaterialsIcon />
                        </div>
                        <div className={classes.transactionDescription}>
                          <span className={classes.descrTitle}>Materials</span>
                          <span className={classes.time}>11.43PM</span>
                        </div>
                      </div>
                      <span className={classes.transactionPrice}>-$142.23</span>
                    </div>
                    <div className={classes.transactionRecord}>
                      <div className={classes.transactionInfo}>
                        <div className={`${classes.transactionIcon} ${classes.iconBackgroundYellow}`}>
                          <FurnitureIcon />
                        </div>
                        <div className={classes.transactionDescription}>
                          <span className={classes.descrTitle}>Furniture</span>
                          <span className={classes.time}>11.43PM</span>
                        </div>
                      </div>
                      <span className={classes.transactionPrice}>-$54.23</span>
                    </div>
                  </div>
                </div>
            </Grid>
            <Grid item xs={12}>
              <CompaniesList className={classes.adjustTable} viewStatus={_authUser.roles && _authUser.roles.includes(BASE_USER_ROLES.superUser) ? 'ACCESS' : BASE_USER_ROLES.superUser} layoutType="internal" />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
                <div className={classes.widgetWrapper}>
                    <h2 className={`${classes.widgetTitle}`}>Spent Time</h2>
                    <ReactApexChart options={dataFour.options} series={dataFour.series} type="radar" height={350} /> 
                </div>
            </Grid >
            <Grid item lg={6} md={6} xs={12}>
                <div className={classes.widgetWrapper}>
                    <h2 className={`${classes.widgetTitle}`}>Statistics</h2>
                    <ReactApexChart options={dataTwo.options} series={dataTwo.series} type="line" height={350} />
                </div>
            </Grid >
        </Grid>
    )
}

export default withStyles(styles)(withAuthUser(Dashboard));