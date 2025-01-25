import { makeStyles } from "@material-ui/styles";

const drawerWidth = 200;

export default makeStyles(theme => ({
  menuButton: {
    marginLeft: -2,
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
      width: '.3em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.2)',
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
}));
