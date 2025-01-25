import React from "react";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  AppBar
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import {
  Phone as PhoneIcon,
  ExpandMore as ExpandMoreIcon
} from "@material-ui/icons";
import StarBorderIcon from '@material-ui/icons/StarBorder';

// components
import Widget from "../../components/Widget";
import Typography from '../../../../common/Typography';
import Button from '../../../../common/Button';

const styles = theme => ({
  root: {
    '& .react-swipeable-view-container': {
      transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s !important'
    },
  },
  tabsRoot: {
    minHeight: 46,
    boxShadow: '4px 4px 14px 0 rgba(133,152,174,.25)'
  },
  tabRoot: {
    minHeight: 46,
    '& > span': {
      flexDirection: 'row',
      '& > svg': {
        marginBottom: 4,
        marginRight: 4
      }
    }
  },
  expansion: {
    border: `1px solid ${theme.palette.text.primaryTheme}`,
    borderRadius: 2,
    margin: '0px!important',
    fontWeight: 500,
    background: '#D1E7FF',
    boxShadow: 'none',
    '&:nth-child(1)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    '&:nth-child(2)': {
      border: `0px solid ${theme.palette.text.primaryTheme}`,
      borderRadius: 0,
      borderRight: `1px solid ${theme.palette.text.primaryTheme}`,
      borderLeft: `1px solid ${theme.palette.text.primaryTheme}`,
    },
    '& > div > div > span': {
      color: `${theme.palette.text.primaryTheme}!important`,
      fontWeight: 'bold',
    }
  },
  tabTitle: {
    color: `${theme.palette.text.primaryTheme}!important`
  },
  indicator: {
    background: theme.palette.text.primaryTheme
  },
  appbarRoot: {
    marginTop: 10,
    boxShadow: 'none',
  },
  expansionPanelRoot: {
    border: '1px solid #8598AE',
    borderRadius: 2,
    margin: '0px!important',
    color: '#8598AE',
    fontWeight: 500,
    boxShadow: 'none',
    '&:nth-child(1)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    '&:nth-child(2)': {
      border: '0px solid #8598AE',
      borderRadius: 0,
      borderRight: '1px solid #8598AE',
      borderLeft: '1px solid #8598AE'
    },
    '& > div > div > span': {
      color: '#8598AE',
      fontWeight: 500,
    }
  },
  expansionPanelDisabled: {
    boxShadow: 'none',
    margin: '0px!important',
    border: '1px solid #8598AE',
    borderRadius: 2,
    background: 'rgba(133,152,174, .3)',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '& > div > div > span': {
      color: '#8598AE',
      fontWeight: 500,
    }
  },
  boxMargin: {
    marginTop: 20
  }
})


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

function TabsComp({ classes }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [iconValue, setIconValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIconTab(event, newValue) {
    setIconValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  function handleChangeIndexIconTab(index) {
    setIconValue(index);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Widget title="Tabs Example" disableWidgetMenu inheritHeight>
            <AppBar classes={{ root: classes.appbarRoot }} position="static" color="white">
              <Tabs
                classes={{
                  indicator: classes.indicator,
                  root: classes.tabsRoot,
                }}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabTitle }} label="Item One" {...a11yProps(0)} />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabTitle }} label="Item Two" {...a11yProps(1)} />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabTitle }} label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                Tabs-enabled widget You will never know exactly how something
                will go until you try it. You can think three hundred times and
                still have no precise result. If you see attractive girl all you
                need to do is to go and ask her to give you her phone. You don’t
                need to think about HOW it can turn out. All you have to do is
                to GO and DO IT. It should be super-fast and easy. No
                hesitation. You ask me: “What to do with these fearful thoughts
                preventing me from doing that?” The answer is to ignore them,
                because they can’t disappear immediately. The same thing is for
                startups and ideas. If you have an idea right away after it
                appears in your mind you should go and make a first step to
                implement it.
                <Box display="flex" justifyContent={"flex-end"} classes={{ root: classes.boxMargin }}>
                  <Box m={1}>
                    <Button color="secondary">
                      Cancel
                    </Button>
                  </Box>
                  <Box m={1}>
                    <Button color="primary">
                      Some button
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                Why don't use Lore Ipsum? I think if some one says don't use
                lore ipsum it's very controversial point. I think the opposite
                actually. Everyone knows what is lore ipsum - it is easy to
                understand if text is lore ipsum.
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                If you will think too much it will sink in the swamp of never
                implemented plans and ideas or will just go away or will be
                implemented by someone else. 5 months of doing everything to
                achieve nothing. You'll automatically skip - because you know -
                it's just non-informative stub. But what if there some text like
                this one?
              </TabPanel>
            </SwipeableViews>
          </Widget>
        </Grid>

        <Grid item md={6}>
          <Widget title="Icons Tabs" disableWidgetMenu inheritHeight>
            <AppBar classes={{ root: classes.appbarRoot }} position="static" color="white">
              <Tabs
                classes={{
                  indicator: classes.indicator,
                  root: classes.tabsRoot,
                }}
                value={iconValue}
                onChange={handleChangeIconTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabTitle }} label="Item One" icon={<StarBorderIcon />} {...a11yProps(0)} />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabTitle }} label="Item Two" icon={<StarBorderIcon />} {...a11yProps(1)} />
                <Tab classes={{ root: classes.tabRoot, selected: classes.tabTitle }} label="Item Three" icon={<StarBorderIcon />} {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={iconValue}
              onChangeIndex={handleChangeIndexIconTab}
            >
              <TabPanel value={iconValue} index={0} dir={theme.direction}>
                Tabs-enabled widget You will never know exactly how something
                will go until you try it. You can think three hundred times and
                still have no precise result. If you see attractive girl all you
                need to do is to go and ask her to give you her phone. You don’t
                need to think about HOW it can turn out. All you have to do is
                to GO and DO IT. It should be super-fast and easy. No
                hesitation. You ask me: “What to do with these fearful thoughts
                preventing me from doing that?” The answer is to ignore them,
                because they can’t disappear immediately. The same thing is for
                startups and ideas. If you have an idea right away after it
                appears in your mind you should go and make a first step to
                implement it.
                <Box display="flex" justifyContent={"flex-end"} classes={{ root: classes.boxMargin }}>
                  <Box m={1}>
                    <Button color="secondary">
                      Cancel
                    </Button>
                  </Box>
                  <Box m={1}>
                    <Button color="primary">
                      Some button
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value={iconValue} index={1} dir={theme.direction}>
                Why don't use Lore Ipsum? I think if some one says don't use
                lore ipsum it's very controversial point. I think the opposite
                actually. Everyone knows what is lore ipsum - it is easy to
                understand if text is lore ipsum.
              </TabPanel>
              <TabPanel value={iconValue} index={2} dir={theme.direction}>
                If you will think too much it will sink in the swamp of never
                implemented plans and ideas or will just go away or will be
                implemented by someone else. 5 months of doing everything to
                achieve nothing. You'll automatically skip - because you know -
                it's just non-informative stub. But what if there some text like
                this one?
              </TabPanel>
            </SwipeableViews>
          </Widget>
        </Grid>
        <Grid item md={6}>
          <Widget
            title="Expansion Panel Example"
            disableWidgetMenu
            inheritHeight
          >
            <ExpansionPanel classes={{ root: classes.expansionPanelRoot }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Expansion Panel 1</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel classes={{ root: classes.expansionPanelRoot }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Expansion Panel 2</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel classes={{ root: classes.expansionPanelDisabled }} disabled>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Disabled Expansion Panel</Typography>
              </ExpansionPanelSummary>
            </ExpansionPanel>
          </Widget>
        </Grid>
        <Grid item md={6}>
          <Widget
            title="Customize Expansion Panel Example"
            disableWidgetMenu
            inheritHeight
          >
            <ExpansionPanel classes={{ root: classes.expansion }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Expansion Panel 1</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel classes={{ root: classes.expansion }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Expansion Panel 2</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel classes={{ root: classes.expansionPanelDisabled }} disabled>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Disabled Expansion Panel</Typography>
              </ExpansionPanelSummary>
            </ExpansionPanel>
          </Widget>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(TabsComp)