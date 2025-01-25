import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
  Box
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

// components
import Widget from "../../components/Widget";
import Dot from "../../components/Dot";
import Code from "../../components/Code";
import Typography from '../../../../common/Typography';
import Button from '../../../../common/Button';

//Theme
import { themeOptions } from "../../../../../Themes/primary";

const styles = theme => ({
  wrapper: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(1)
  },
  text: {
    marginBottom: theme.spacing(2),
    display: 'block',
  },
  titleSpacing: {
    display: 'inline-block',
    marginBottom: 10,
  },
  oddRow: {
    background: 'rgba(225,239,255,.28)',
    '& td': {
      border: 'none',
      '& div': {
        background: 'inherit'
      }
    },
  },
  evenRow: {
    '& td': {
      border: 'none',
      '& div': {
        background: 'inherit'
      }
    }
  },
  tableHead: {
    textTransform: 'uppercase',
    '& th': {
      border: 'none',
      color: '#A1AEBD',
    }
  }
});

function ColorsComp({ classes }) {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography className={classes.titleSpacing} variant="h2" color="primary">Colors</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Widget title="States Colors" disableWidgetMenu noBodyPadding>
            <Table className="mb-0">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>State</TableCell>
                  <TableCell>Preview</TableCell>
                  <TableCell>Usage Example</TableCell>
                  <TableCell>Hex Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className={classes.oddRow}>
                  <TableCell>Primary</TableCell>
                  <TableCell>
                    <Dot color="primaryTheme" size="large" />
                  </TableCell>
                  <TableCell>
                    <Code row>{`<Button color="primaryTheme">`}</Code>
                  </TableCell>
                  <TableCell>
                    <Code row>
                      {
                        themeOptions.palette.text
                          .primaryTheme
                      }
                    </Code>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.evenRow}>
                  <TableCell align="left">Secondary</TableCell>
                  <TableCell>
                    <Dot color="secondaryLight" size="large" />
                  </TableCell>
                  <TableCell>
                    <Code row>{`<Dot color="secondaryLight">`}</Code>
                  </TableCell>
                  <TableCell>
                    <Code row>
                      {
                        themeOptions.palette.text.secondaryLight
                      }
                    </Code>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.oddRow}>
                  <TableCell align="left">Warning</TableCell>
                  <TableCell>
                    <Dot color="warningTheme" size="large" />
                  </TableCell>
                  <TableCell>
                    <Code row>{`<Typography color="warningTheme">`}</Code>
                  </TableCell>
                  <TableCell>
                    <Code row>
                      {
                        themeOptions.palette.text.warningTheme
                      }
                    </Code>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.evenRow}>
                  <TableCell align="left">Danger</TableCell>
                  <TableCell align="right">
                    <Dot color="errorTheme" size="large" />
                  </TableCell>
                  <TableCell>
                    <Code row>{`<Icon color="errorTheme">`}</Code>
                  </TableCell>
                  <TableCell>
                    <Code row>
                      {themeOptions.palette.text.errorTheme}
                    </Code>
                  </TableCell>
                </TableRow>
              
                <TableRow className={classes.oddRow}>
                  <TableCell align="left">Success</TableCell>
                  <TableCell>
                    <Dot color="successTheme" size="large" />
                  </TableCell>
                  <TableCell>
                    <Code row>{`<Notification color="successTheme">`}</Code>
                  </TableCell>
                  <TableCell>
                    <Code row>
                      {
                        themeOptions.palette.text.successTheme
                      }
                    </Code>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.evenRow}>
                  <TableCell align="left">Info</TableCell>
                  <TableCell align="right">
                    <Dot color="infoTheme" size="large" />
                  </TableCell>
                  <TableCell>
                    <Code row>{`<Icon color="infoTheme">`}</Code>
                  </TableCell>
                  <TableCell>
                    <Code row>
                      {themeOptions.palette.text.info}
                    </Code>
                  </TableCell>
                </TableRow>
                
              </TableBody>
            </Table>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
        <Widget title="Typography Colors" disableWidgetMenu>
            <div className={classes.wrapper}>
              <Typography variant="h1" color="defaultTheme" className={classes.text}>
                h1. Heading
              </Typography>
              <Typography variant="h2" color="primaryTheme" className={classes.text}>
                h2. Heading
              </Typography>
              <Typography
                variant="h3"
                color="infoTheme"
                className={classes.text}
              >
                h3. Heading
              </Typography>
              <Typography variant="h4" color="errorTheme" className={classes.text}>
                h4. Heading
              </Typography>
              <Typography
                variant="h5"
                color="warningTheme"
                colorBrightness="light"
                className={classes.text}
              >
                h5. Heading
              </Typography>
              <Typography variant="h6" color="successTheme">
                h6. Heading
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12} md={6}>
          <Widget title="Example buttons" disableWidgetMenu inheritHeight>
            <Box display={"flex"} flexWrap="wrap">
              <Box mt={2} mr={2}>
                <Button
                  color="secondary"
                  variant="contained"
                >default</Button>
              </Box>
              <Box mt={2} mr={2}>
                <Button
                  color="primary"
                  variant="contained"
                >
                  primary
                </Button>
              </Box>
              <Box mt={2} mr={2}>
                <Button
                  color="info"
                  variant="contained"
                >
                  secondary
                </Button>
              </Box>
              <Box mt={2} mr={2}>
                <Button
                  color="warning"
                  variant="contained"
                >
                  warning
                </Button>
              </Box>
              <Box mt={2} mr={2}>
                <Button
                  color="danger"
                  variant="contained"
                >
                  danger
                </Button>
              </Box>
              <Box mt={2} mr={2}>
                <Button
                  color="success"
                  variant="contained"
                >
                  success
                </Button>
              </Box>
              <Box mt={2} mr={2}>
                <Button variant="contained" color="infoTheme">
                  info
                </Button>
              </Box>
            </Box>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styles)(ColorsComp)