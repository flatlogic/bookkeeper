import React, { useState } from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    Tooltip,
  } from 'recharts';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import { MoreVert as MoreIcon } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '../../../../../common/Button';

import GrowthIcon from '../../../../../../images/icons/growth.png';

const styles = theme => ({
    widgetBackground: {
        background: "#fff",
        transition: 'background .35s ease',
        cursor: 'pointer',
    },
    contentWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',   
    },
    widgetTitle: {
        fontSize: 20,
        color: theme.palette.primary.main,
        fontWeight: 'normal',
        margin: 0,
        transition: 'color .35s ease',
    },
    widgetSubtitle: {
        color: theme.palette.text.successTheme,
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
        display: 'flex',
        alignItems: 'end',
        '& > img': {
            marginLeft: 5
        }
    },
    textContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 20,
        marginTop: 15
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seeMoreBtn: {
        color: theme.palette.text.primaryTheme,
        borderColor: theme.palette.text.primaryTheme,
        textTransform: 'none',
        padding: '5px 10px',
        marginTop: 10
    }
})

const SimpleLine = ({ classes, color, title, subtitle, value }) => {

    const [moreButtonRef, setMoreButtonRef] = useState(null);
    const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

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
        <div className={classes.titleWrapper}>
            <h4 className={classes.widgetTitle}>{title}</h4>
            <IconButton
                color="#9B9B9B"
                aria-owns="widget-menu"
                aria-haspopup="true"
                onClick={() => setMoreMenuOpen(true)}
                buttonRef={setMoreButtonRef}
            >
                <MoreIcon />
            </IconButton>
        </div>
        <Menu
            id="widget-menu"
            open={isMoreMenuOpen}
            anchorEl={moreButtonRef}
            onClose={() => setMoreMenuOpen(false)}
            disableAutoFocusItem
        >
            <MenuItem>
                <Typography>Edit</Typography>
            </MenuItem>
            <MenuItem>
                <Typography>Copy</Typography>
            </MenuItem>
            <MenuItem>
                <Typography>Delete</Typography>
            </MenuItem>
            <MenuItem>
                <Typography>Print</Typography>
            </MenuItem>
        </Menu>  
        <div className={classes.contentWrapper}>
          <div className={classes.textContent}>
            <h5 className={classes.widgetValue}>{value}<img src={GrowthIcon} alt="arrow" /></h5>
            <span className={classes.widgetSubtitle}>{subtitle}</span>
            <Button classes={{ root: classes.seeMoreBtn }} color="transparent">See More</Button>
          </div>
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
