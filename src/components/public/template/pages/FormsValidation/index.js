import React from "react";
import { Grid, Box } from "@material-ui/core";
import Input from "@material-ui/core/TextField";

// components
import Widget from "../../components/Widget";
import Button from '../../../../common/Button';
import Typography from '../../../../common/Typography';

export default () => {
  const ref = React.useRef(null);
  const [isError, setError] = React.useState(false);
  const validate = () => {
    setError(true);
  };
  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Widget
            title="Dead simple validation"
            disableWidgetMenu
            inheritHeight
          >
            <Grid
              container
              direction={"column"}
              alignItems="center"
              spacing={6}
            >
              <Grid item container alignItems={"center"} xs={6}>
                <Grid item xs={6}>
                  <Typography variant={"body1"}>Simple required</Typography>
                </Grid>
                <Grid xs={6} item>
                  <Input
                    id="component-helper9"
                    style={{ width: "100%" }}
                    ref={ref}
                    error={isError}
                  />
                </Grid>
              </Grid>
              <Grid item container alignItems={"center"} xs={6}>
                <Grid item xs={6}>
                  <Typography variant={"body1"}>
                    Min-length On Change
                  </Typography>
                  <Typography
                    variant={"caption"}
                    color="text"
                    colorBrightness={"secondary"}
                  >
                    At least 10
                  </Typography>
                </Grid>
                <Grid xs={6} item>
                  <Input
                    id="component-helper10"
                    style={{ width: "100%" }}
                    inputProps={{ maxLength: 10 }}
                  />
                </Grid>
              </Grid>
              <Grid item container alignItems={"center"} xs={6}>
                <Grid xs={12} item>
                  <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="secondary">Cancel</Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: 20}}
                      onClick={() => validate()}
                    >
                      Validate
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
    </div>
  );
};
