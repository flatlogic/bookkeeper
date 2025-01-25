import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  border: {
    position: "relative",
    "&:before": {
      content: "''",
      position: "absolute",
      border: "1px solid transparent",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#ccc",
      height: "calc(100% + 38px)",
      width: 1,
    },
  },
  circle: {
    border: "rgba(255,255,255,.2) 5px solid",
    width: 30,
    height: 30,
  },
}));
