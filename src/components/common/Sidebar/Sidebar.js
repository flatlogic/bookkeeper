import React, { useState, useEffect } from "react";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { Drawer, IconButton, List } from "@material-ui/core";
import { useTheme, withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import MenuIcon from '@material-ui/icons/Menu';
import { PersonPin } from "@material-ui/icons";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ACicon from './components/icons/ACicon';
import GLicon from './components/icons/GLicon';
import SUicon from './components/icons/SUicon';
import ORGicon from './components/icons/ORGicon';
import UserIcon from './components/icons/UserIcon';
import CompIcon from './components/icons/CompIcon';
import DBIcon from './components/icons/DBIcon';

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import { ADMIN_ROUTES, PUBLIC_ROUTES, TEMPLATE_ROUTES } from '../../../config';
import ProtectedArea from '../../../containers/ProtectedArea';

import structure from './structure';

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar
} from "./LayoutContext";

const drawerWidth = 215;

const styles = theme => ({
  drawer: {
    '@media print': {
      display: 'none',
    },
  },
  menuButton: {
    marginLeft: -2,
    color: '#9B9A9B99',
  },
  headerIcon: {
    color: '#9B9A9B99',
  },
  hide: {
    display: "none"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  sidebarList: {
    marginTop: 0,
    paddingTop: 2,
  },
  mobileBackButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  popover: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff"
  },
  fab: {
    width: 36,
    height: 34
  },
  noBoxShadow: {
    boxShadow: "none !important",
    marginRight: theme.spacing(1)
  },
  buttonLabel: {
    color: "#fff"
  },
  input: {
    "& .MuiInputBase-input": {
      color: "#fff"
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid rgba(255, 255, 255, .45)"
    }
  },
  chat: {
    width: 45,
    height: 45
  },
  padding: {
    paddingBottom: theme.spacing(2)
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  scrollBar: {
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      width: '3px',
    },
    '&::-webkit-scrollbar-track': {
      width: '3px',
      background: '#cccccc',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#969696',
      outline: '1px solid slategrey',
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 60,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    minHeight: 59,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  sidebarLogo: {
    height: 32,
    marginLeft: 4,
    width: 110,
    marginTop: 2,
  }
})

function Sidebar({ location, classes }) {

  var theme = useTheme();

  const toggleDrawer = value => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (value && !isPermanent) toggleSidebar(layoutDispatch);
  };

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  if (window.location.href.includes('error') || window.location.href.includes('loginPage')) {
    return null;
  }

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: !isPermanent ? !isSidebarOpened : isSidebarOpened,
        [classes.drawerClose]: !isPermanent ? isSidebarOpened : !isSidebarOpened
      })}
      classes={{
        paper: classNames(classes.scrollBar, {
          [classes.drawerOpen]: !isPermanent
            ? !isSidebarOpened
            : isSidebarOpened,
          [classes.drawerClose]: !isPermanent
            ? isSidebarOpened
            : !isSidebarOpened
        })
      }}
      open={!isPermanent ? !isSidebarOpened : isSidebarOpened}
      onClose={toggleDrawer(true)}
    >
        <div className={classes.toolbar}>
          {isSidebarOpened ? (
            <IconButton style={{ marginLeft: -3 }} onClick={() => toggleSidebar(layoutDispatch)}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>            
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => toggleSidebar(layoutDispatch)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img className={classes.sidebarLogo} src="/images/logo.svg" alt="Bookkeeper"/>
        </div>
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        </IconButton>
      </div>
      <List
        className={classes.sidebarList}
        classes={{ padding: classes.padding }}
      >
        <SidebarLink
          key={2}
          location={location}
          isSidebarOpened={!isPermanent ? !isSidebarOpened : isSidebarOpened}
          {...{ id: 2, label: 'Dashboard', link: TEMPLATE_ROUTES.dashboard,
          icon: <DBIcon /> }}
          toggleDrawer={toggleDrawer(true)}
        />
        <SidebarLink
          key={2}
          location={location}
          isSidebarOpened={!isPermanent ? !isSidebarOpened : isSidebarOpened}
          {...{ id: 2, label: 'Profile', link: TEMPLATE_ROUTES.profile,
          icon: <PersonPin /> }}
          toggleDrawer={toggleDrawer(true)}
        />
        <SidebarLink
          key={3}
          location={location}
          isSidebarOpened={!isPermanent ? !isSidebarOpened : isSidebarOpened}
          {...{ id: 3, label: 'General Ledger', link: PUBLIC_ROUTES.generalLedger,
          icon: <GLicon /> }}
          toggleDrawer={toggleDrawer(true)}
        />
        <SidebarLink
          key={4}
          location={location}
          isSidebarOpened={!isPermanent ? !isSidebarOpened : isSidebarOpened}
          {...{ id: 4, label: 'Accounts Receivable', link: PUBLIC_ROUTES.accountsReceivable,
          icon: <ACicon /> }}
          toggleDrawer={toggleDrawer(true)}
        />
        <ProtectedArea roles={['SUPER_USER', 'ADMINISTRATOR']}>
          <SidebarLink
            key={111}
            location={location}
            isSidebarOpened={!isPermanent ? !isSidebarOpened : isSidebarOpened}
            {...{ id: 111, label: 'Super Users', link: ADMIN_ROUTES.superUsersList,
            icon: <SUicon /> }}
            toggleDrawer={toggleDrawer(true)}
          />
          <SidebarLink
            key={222}
            location={location}
            isSidebarOpened={!isPermanent ? !isSidebarOpened : isSidebarOpened}
            {...{ id: 222, label: 'Organizations', link: ADMIN_ROUTES.organizationsList,
            icon: <ORGicon /> }}
            toggleDrawer={toggleDrawer(true)}
          /> 
          <SidebarLink
            key={333}
            location={location}
            isSidebarOpened={!isPermanent ? !isSidebarOpened : isSidebarOpened}
            {...{ id: 333, label: 'Users', link: ADMIN_ROUTES.usersList,
            icon: <UserIcon /> }}
            toggleDrawer={toggleDrawer(true)}
          /> 
          <SidebarLink
            key={444}
            location={location}
            isSidebarOpened={!isPermanent ? !isSidebarOpened : isSidebarOpened}
            {...{ id: 444, label: 'Companies', link: ADMIN_ROUTES.companiesList,
            icon: <CompIcon /> }}
            toggleDrawer={toggleDrawer(true)}
          />         
        </ProtectedArea> 
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={!isPermanent ? !isSidebarOpened : isSidebarOpened}
            {...link}
            toggleDrawer={toggleDrawer(true)}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withStyles(styles)(withRouter(Sidebar));
