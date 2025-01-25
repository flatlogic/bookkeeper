import React from "react";
import { Grid, Box } from "@material-ui/core";

// components
import Widget from "../../components/Widget";
import { CircularProgress, LinearProgress } from "../../components/Wrappers";

export default function ProgressComp() {
  const [completed, setCompleted] = React.useState(0);
  React.useEffect(() => {
    function progress() {
      setCompleted(oldCompleted => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }
    const timer = setInterval(progress, 1500);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Widget title="Circular Indeterminate" disableWidgetMenu>
            <Box my={3} display="flex" flexWrap="wrap" justifyContent="center">
              <Box mt={1} mr={2}>
                <CircularProgress color="errorTheme" />
              </Box>
              <Box mt={1} mr={2}>
                <CircularProgress color="secondaryTheme" />
              </Box>
              <Box mt={1} mr={2}>
                <CircularProgress color="warningTheme" />
              </Box>
              <Box mt={1} mr={2}>
                <CircularProgress color="successTheme" />
              </Box>
              <Box mt={1} mr={2}>
                <CircularProgress color="infoTheme" />
              </Box>
            </Box>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Linear Indeterminate" disableWidgetMenu>
            <Box
              my={3}
              display="flex"
              flexWrap="wrap"
              alignItems="center"
              flexDirection="column"
            >
              <Box mt={1} mr={2} width="100%">
                <LinearProgress color="errorTheme" />
              </Box>
              <Box mt={1} mr={2} width="100%">
                <LinearProgress color="secondaryTheme" />
              </Box>
              <Box mt={1} mr={2} width="100%">
                <LinearProgress color="warningTheme" />
              </Box>
              <Box mt={1} mr={2} width="100%">
                <LinearProgress color="successTheme" />
              </Box>
              <Box mt={1} mr={2} width="100%">
                <LinearProgress color="infoTheme" />
                <br />
                <LinearProgress
                  color="infoTheme"
                  variant="determinate"
                  value={completed}
                />
              </Box>
            </Box>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
