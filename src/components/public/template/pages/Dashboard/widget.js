import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    Tooltip,
  } from "recharts";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    widgetBackground: {
        background: "#fff",
        marginBottom: 24,
        padding: 25,
        transition: 'background .35s ease',
        cursor: 'pointer',
        [theme.breakpoints.down("sm")]: {
          marginBottom: 0,
        },
    },
    contentWrapper: {
        display: 'flex',
        justifyContent: 'space-between'     
    },
    widgetTitle: {
        fontSize: 20,
        color: theme.palette.primary.main,
        fontWeight: 'normal',
        margin: 0,
        transition: 'color .35s ease',
    },
    widgetSubtitle: {
        color: '#A1AEBD',
        fontSize: 12,
        lineHeight: '25px',
        textTransform: 'uppercase',
        transition: 'color .35s ease',
    },
    widgetValue: {
        fontWeight: 'normal',
        fontSize: '28px',
        lineHeight: '25px',
        margin: 0,
        transition: 'color .35s ease',
    },
    textContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 20,
    }
})

const SimpleLine = ({ classes, color, title, subtitle, value }) => {

    function getRandomData(length, min, max, multiplier = 10, maxDiff = 5) {
        var array = new Array(length).fill();
        let lastValue;
      
        return array.map((item, index) => {
          let randomValue = Math.floor(Math.random() * multiplier + 1);
      
          while (
            randomValue <= min ||
            randomValue >= max ||
            (lastValue && randomValue - lastValue > maxDiff)
          ) {
            randomValue = Math.floor(Math.random() * multiplier + 1);
          }
      
          lastValue = randomValue;
      
          return { value: randomValue };
        });
      }
    const randomData = React.useMemo(() => getRandomData(4), []);
    return (
      <div className={classes.widgetBackground}>
        <h4 className={classes.widgetTitle}>{title}</h4>
        <div className={classes.contentWrapper}>
          <ResponsiveContainer height={70} width="50%">
            <AreaChart data={randomData}>
              <Area
                type="natural"
                dataKey="value"
                stroke={color}
                fill={color}
                strokeWidth={2}
                fillOpacity="0.1"
              />
              <Tooltip
                itemStyle={{
                  background: 'transparent',
                  color: '#ffffff',
                }}
                wrapperStyle={{
                  background: 'rgba(0,0,0,.6)',
                  borderRadius: 2,
                  border: 'none',
                }}
                contentStyle={{
                  background: 'transparent',
                  border: 'none',
                }}
                labelStyle={{
                  background: 'transparent',
                  color: 'rgba(255,255,255,.8)'
                }}
                offset={0}
                allowEscapeViewBox={{
                  x: true,
                  y: true
                }}
                coordinate={{ x: -400, y: -240 }}
                payload={[{ name: '05-01', value: 12, unit: 'kg' }]}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className={classes.textContent}>
            <span className={classes.widgetSubtitle}>{subtitle}</span>
            <h5 className={classes.widgetValue}>{value}</h5>
          </div>
        </div>
      </div>
    );
}

SimpleLine.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  value: PropTypes.number,
}

export default withStyles(styles)(SimpleLine);
