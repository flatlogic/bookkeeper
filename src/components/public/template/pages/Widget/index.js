import React from "react";
import { Grid, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// components
import Widget from "../../components/Widget";
import Code from "../../components/Code";
import Typography from '../../../../common/Typography';

const styles = theme => ({
  paper: {
    margin: "24px 0",
    backgroundColor: "#f3f3f3",
  },
  widgetStyle: {
    margin: '30px 0',
    display: 'block',
    minHeight: 'unset',
    boxShadow: '4px 4px 14px 0 rgba(133, 152, 174, .25)',
    '& > div': {
      height: '100%',
      display: 'block',
    },
  }
});

function WidgetComp({ classes }) {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Widget title="Simple Widget" disableWidgetMenu>
            <Typography block>
              It appears in the top of the page container. It have to be the
              first component after <Code row inline>{`return`}</Code>{" "}
              statement.
            </Typography>
            <Widget
                title="Simple Widget"
                disableWidgetMenu
                className={classes.widgetStyle}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. A,
                rem?
            </Widget>
      
            <Code>
                {`
  <Widget title="Simple Widget" disableWidgetMenu>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. A,
    rem?
  </Widget>
              `}
              </Code>
            
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Page Title" disableWidgetMenu inheritHeight>
            <Typography block>
              It appears in the top of the page container. It have to be the
              first component after <Code row inline>{`return`}</Code>{" "}
              statement.
            </Typography>
            <Box mt={1}>
              <Code>
                {`
              <PageTitle title="Widget" />
              `}
              </Code>
            </Box>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styles)(WidgetComp);