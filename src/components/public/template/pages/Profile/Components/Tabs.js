import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FolderBlue from '../Icons/FolderBlue';
import FolderRed from '../Icons/FolderRed';
import FolderGreen from '../Icons/FolderGreen';
import FolderYellow from '../Icons/FolderYellow';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import {MenuItem, Select} from '@material-ui/core'

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
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AntTabs = withStyles({
  root: {
    borderBottom: `1px solid #e8e8e8`,
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
    flexGrow: 1,
    '& .react-swipeable-view-container': {
      transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s !important'
    },
    paddingBottom: 0,
  },
  padding: {
    padding: theme.spacing(3),
    paddingBottom: 0,
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
  }
})

function CustomizedTabs({ classes }) {
  const [value, setValue] = React.useState(0);
  const [index, setIndex] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   console.log(newValue);
  //   setValue(newValue);
  // };

  const handleChange = (event, index) => {
    setIndex(index)
  }

  const handleChangeIndex = (index) => {
    setIndex(index)
  }

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
        <AntTab value={0} label="WORK" />
        <AntTab value={1} label="PRIVATE" />
        <AntTab value={2} label="SCHOOL" />
      </AntTabs>
      <SwipeableViews
        index={index}
        style={{ padding: '24px 0 0'}}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel>
          <span className={classes.folderWrapper}>
            <FolderBlue title="UI/UX" label="files" value={178} />
            <FolderRed title="Design" label="files" value={154} />
            <FolderGreen title="Mobile" label="files" value={98} />
            <FolderYellow title="Illustration" label="files" value={147} />
          </span>
        </TabPanel>
        <TabPanel>
          <span className={classes.folderWrapper}>
            <FolderBlue title="UI/UX" label="files" value={178} />
            <FolderRed title="Design" label="files" value={154} />
            <FolderGreen title="Mobile" label="files" value={98} />
            <FolderYellow title="Illustration" label="files" value={147} />
          </span>
        </TabPanel>
        <TabPanel>
          <span className={classes.folderWrapper}>
            <FolderBlue title="UI/UX" label="files" value={178} />
            <FolderRed title="Design" label="files" value={154} />
            <FolderGreen title="Mobile" label="files" value={98} />
            <FolderYellow title="Illustration" label="files" value={147} />
          </span>
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
