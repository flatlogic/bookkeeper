import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  widgetWrapper: {
    display: "flex",
    minHeight: "100%"
  },
  inheritHeight: {
    minHeight: "auto"
  },
  widgetHeader: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(2.3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '& p': {
      fontSize: 20,
      lineHeight: '25px',
      color: theme.palette.text.primary
    }
  },
  widgetRoot: {
    boxShadow: 'none'
  },
  widgetBody: {
    height: props => (props.fullHeight ? "100%" : "inherit"),
    paddingBottom: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3)
  },
  noPadding: {
    padding: 0
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
    borderRadius: 0,
  },
  moreButton: {
    margin: -theme.spacing(1),
    padding: 0,
    width: 40,
    height: 40,
    color: theme.palette.text.hint,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "rgba(255, 255, 255, 0.35)"
    }
  },
  paddingTop: {
    paddingTop: theme.spacing(3)
  },
  searchIcon: {
    color: "rgba(0, 0, 0, 0.23)"
  },
  legendItemContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8
  },
  detailsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 24,
    paddingLeft: 24,
    width: '100%',
  },
  formControl: {
    margin: 0,
    minWidth: 65,
    '& > div > svg': {
      right: '2px',
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  topPart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 24
  },
  selectPadding: {
    padding: 7,
    '& > svg': {
      right: 0
    }
  },
  inputPosition: {
    transform: 'translate(7px, 10px) scale(1)',
    fontSize: 15
  },
}));
