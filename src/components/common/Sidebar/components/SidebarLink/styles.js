import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  popover: {
    backgroundColor: theme.palette.primary.main,
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
  noBoxShadow: {
    boxShadow: "none !important",
    marginRight: theme.spacing(1)
  },
  buttonLabel: {
    color: "#fff"
  },
  link: {
    paddingLeft: 20,
    textDecoration: "none",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.default,
      "& > .MuiSvgIcon-root": {
        display: "inline-block"
      }
    },
    "&.Mui-focusVisible": {
      backgroundColor: "transparent"
    }
  },
  linkActive: {
    backgroundColor: 'rgba(56, 149, 255, 0.15)!important',
    color: theme.palette.activeText,
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.background.light
          : "#FFFFFF"
    }
  },
  linkIcon: {
    minWidth: 'unset',
    width: 18,
    marginRight: '16px!important',
    color:
      theme.palette.type === "dark"
        ? "#616168 !important"
        : theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    display: "flex",
    justifyContent: "center"
  },
  linkIconActive: {
    color: theme.palette.activeText
  },
  linkText: {
    padding: 0,
    color:
      theme.palette.type === "dark"
        ? "#D6D6D6 !important"
        : theme.palette.text.secondary + "CC",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: '14px!important'
  },
  linkTextActive: {
    color: "rgba(52,133,224, .8)",
    fontWeight: 'bold',
  },
  linkTextHidden: {
    opacity: 0
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30
  },
  sectionTitle: {
    marginLeft: `${theme.spacing(4.5)}px!important`,
    marginTop: `${theme.spacing(4)}px!important`,
    marginBottom: `${theme.spacing(2)}px!important`
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: 1,
    backgroundColor:
      theme.palette.type === "dark" ? "rgba(151,151,151, .15)" : "#D8D8D880"
  },
  expand: {
    transform: "rotate(180deg)",
    color: `${theme.palette.activeText}!important`,
  },
  expandWrapper: {
    color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("transform"),
    display: props => (props ? "inline-flex" : "none"),
    marginLeft: 'auto'
  },
  nestedMenu: {
    paddingLeft: 0
  },
  nestedMenuItem: {
    paddingLeft: 0
  }
}));
