import React, { useState } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';

import ToDoItem from './ToDoItem';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ background: index % 2 === 0 && '#E1EFFF' }} p={0}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AntTabs = withStyles({
  root: {
    borderBottom: `1px solid #e8e8e8`,
    margin: '0 24px',
  },
  indicator: {
    backgroundColor: '#FF4D3A',
    borderRadius: 2,
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    color: '#A1AEBD',
    fontFamily: [
      'Roboto',
      'sans-serif'
    ].join(','),
    '&:hover': {
      color: '#4A4A4A',
      opacity: 1,
    },
    '&$selected': {
      color: '#4A4A4A',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#4A4A4A',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);


const styles = (theme) => ({
  root: {
    maxHeight: 550,
    overflow: 'auto',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      width: '3px',
    },
    '&::-webkit-scrollbar-track': {
      width: '3px',
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#D8D8D8',
      borderRadius: 5,
      outline: '1px solid #D8D8D8',
    },
    flexGrow: 1,
    '& .react-swipeable-view-container': {
      transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s !important'
    },
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  folderWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
})

function CustomizedTabs({ classes }) {

  const [index, setIndex] = React.useState(0);

  const handleChange = (event, index) => {
    setIndex(index)
  }

  const handleChangeIndex = (index) => {
    setIndex(index)
  }
 
  const Todos = [
      { color: '#FEAA4B', time: '10.20', title: 'Call conference with a New' },
      { color: '#5DC5FF', time: '10.30', title: 'Presentation Demo Ecological' },
      { color: '#1ACA95', time: '10.50', title: 'Call with PR Manager' },
      { color: '#FEAA4B', time: '11.10', title: 'Interview with a new UI/UX' },
      { color: '#FF4D3A', time: '11.30', title: 'Call conference with a New' },
      { color: '#5DC5FF', time: '12.00', title: 'Presentation Demo Ecological' },
      { color: '#FEAA4B', time: '12.40', title: 'Sales Presentation' },
      { color: '#1ACA95', time: '13.20', title: 'Call conference in New-York' },
      { color: '#FEAA4B', time: '15.20', title: 'Development of the new Widget' },
      { color: '#5DC5FF', time: '16.00', title: 'Code review and refactoring' },
      { color: '#FEAA4B', time: '10.20', title: 'Call conference with a New' },
      { color: '#5DC5FF', time: '10.30', title: 'Presentation Demo Ecological' },
      { color: '#1ACA95', time: '10.50', title: 'Call with PR Manager' },
      { color: '#FEAA4B', time: '11.10', title: 'Interview with a new UI/UX' },
      { color: '#FF4D3A', time: '11.30', title: 'Call conference with a New' },
      { color: '#5DC5FF', time: '12.00', title: 'Presentation Demo Ecological' },
      { color: '#FEAA4B', time: '12.40', title: 'Sales Presentation' },
      { color: '#1ACA95', time: '13.20', title: 'Call conference in New-York' },
      { color: '#FEAA4B', time: '15.20', title: 'Development of the new Widget' },
      { color: '#5DC5FF', time: '16.00', title: 'Code review and refactoring' },
  ]

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const theme = useTheme();

  return (
    <div class={classes.root}>
      <AntTabs
        value={index}
        onChange={handleChange}
      >
        <AntTab value={0} label="TODAY" />
        <AntTab value={1} label="LAST WEEK" />
        <AntTab value={2} label="THIS MONTH" />
      </AntTabs>
      <SwipeableViews
        index={index}
        style={{ padding: 0 }}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel style={{ padding: 0 }}>
            {Todos.map((item, idx) => (
                <ToDoItem backgroundColor={ idx % 2 === 0 ? 'rgba(225,239,255,.28)' : '#fff' } key={idx} color={item.color} time={item.time} title={item.title} />
            ))}
            
        </TabPanel>
        <TabPanel>
            {Todos.map((item, idx) => (
                <ToDoItem backgroundColor={ idx % 2 === 0 ? 'rgba(225,239,255,.28)' : '#fff' } key={idx} color={item.color} time={item.time} title={item.title} />
            ))}
        </TabPanel>
        <TabPanel>
            {Todos.map((item, idx) => (
                <ToDoItem backgroundColor={ idx % 2 === 0 ? 'rgba(225,239,255,.28)' : '#fff' } key={idx} color={item.color} time={item.time} title={item.title} />
            ))}
        </TabPanel>
      </SwipeableViews>
  </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default withStyles(styles)(CustomizedTabs);
