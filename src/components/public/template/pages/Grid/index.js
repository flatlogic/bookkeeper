import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Box,
  Grid
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import cn from "classnames";

// components
import Widget from "../../components/Widget";
import Code from "../../components/Code";
import { Typography, Paper } from "../../components/Wrappers";

const styles = theme => ({
  paperItem: {
    textAlign: "center",
    padding: theme.spacing(2),
    color: "#f3f3f3"
  },
  headBold: {
    fontWeight: 700
  },
  wrapFix: {
    whiteSpace: "pre"
  },
  paperMargin: {
    margin: 12
  },
  fullHeightBody: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column"
  },
  tableCell: {
    color: '#A1AEBD',
    textTransform: 'uppercase',
  },
  lessPadding: {
    padding: '16px 12px',
    border: 'none',
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
  tablePadding: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 24,
    '& p': {
      paddingLeft: 24,
      paddingRight: 24,
    }
  }
})

function GridComp({ classes }) {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Widget title="How it works" disableWidgetMenu>
            <Typography>
              Material UI’s grid system uses a series of containers, rows, and
              columns to layout and align content. It’s built with flexbox and
              is fully responsive. Below is an example and an in-depth look at
              how the grid comes together.
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 24 }}>
              <Grid item xs={4}>
                <Paper className={classes.paperItem} color="primary">
                  One of three
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paperItem} color="danger">
                  One of three
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paperItem} color="warning">
                  One of three
                </Paper>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Code>{`
  <Grid container>
    <Grid item xs={4}>One of three</Grid>
    <Grid item xs={4}>One of three</Grid>
    <Grid item xs={4}>One of three</Grid>
  </Grid>
                  `}</Code>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item md={6}>
          <Widget title="Equal width" disableWidgetMenu>
            <Typography>
              For example, here are two grid layouts that apply to every device
              and viewport, from xs to xl. Add any number of unit-less classes
              for each breakpoint you need and every column will be the same
              width.
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 24 }}>
              <Grid item xs>
                <Paper className={classes.paperItem} color="primary">
                  1 of 2
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paperItem} color="danger">
                  2 of 2
                </Paper>
              </Grid>
              <Grid item xs={12} zeroMinWidth>
                <Code>
                  {`
  <Grid container>
    <Grid item xs>1 of 2</Grid>
    <Grid item xs>2 of 2</Grid>
    <Grid item xs>2 of 2</Grid>
  </Grid>
                  `}
                </Code>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item md={12}>
          <Widget title="Grid options" disableWidgetMenu bodyClass={classes.tablePadding}>
            <Typography>
              While Material UI grid uses ems or rems for defining most sizes,
              pxs are used for grid breakpoints and container widths. This is
              because the viewport width is in pixels and does not change with
              the font size. See how aspects of the Material UI grid system work
              across multiple devices with a handy table.
            </Typography>
            <Table className="mb-0" style={{ overflowX: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell classes={{root: classes.lessPadding}} />
                  <TableCell classes={{root: classes.lessPadding}}>
                    <b className={classes.tableCell}>Extra small</b>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <b className={classes.tableCell}>Small</b>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <b className={classes.tableCell}>Medium</b>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <b className={classes.tableCell}>Large</b>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <b className={classes.tableCell}>Extra large</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow classes={{root: classes.oddRow}}>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <b className={classes.tableCell}>Max container width</b>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>None (auto)</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>540px</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>720px</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>960px</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>1140px</TableCell>
                </TableRow>
                <TableRow classes={{root: classes.evenRow}}>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <b className={classes.tableCell}>Component property</b>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <Code row>{`<Grid item xs>`}</Code>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <Code row>{`<Grid item sm>`}</Code>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <Code row>{`<Grid item md>`}</Code>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <Code row>{`<Grid item lg>`}</Code>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <Code row>{`<Grid item xl>`}</Code>
                  </TableCell>
                </TableRow>
                <TableRow classes={{root: classes.oddRow}}>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <b className={classes.tableCell}># of columns</b>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>12</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>12</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>12</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>12</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>12</TableCell>
                </TableRow>
                <TableRow classes={{root: classes.evenRow}}>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <b className={classes.tableCell}>Spacing</b>{" "}
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <Code row>{`<Grid spacing={2}>`}</Code>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <Code row>{`<Grid spacing={2}>`}</Code>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <Code row>{`<Grid spacing={2}>`}</Code>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <Code row>{`<Grid spacing={2}>`}</Code>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <Code row>{`<Grid spacing={2}>`}</Code>
                  </TableCell>
                </TableRow>
                <TableRow classes={{root: classes.oddRow}}>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <b className={classes.tableCell}>Nestable</b>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>Yes</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>Yes</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>Yes</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>Yes</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>Yes</TableCell>
                </TableRow>
                <TableRow classes={{root: classes.evenRow}}>
                  <TableCell classes={{root: classes.lessPadding}}>
                    <b className={classes.tableCell}>Column ordering</b>
                  </TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>Yes</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>Yes</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>Yes</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>Yes</TableCell>
                  <TableCell classes={{root: classes.lessPadding}}>Yes</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Widget>
        </Grid>
        <Grid item md={6} xs={12}>
          <Widget title="Vertical Alignment" disableWidgetMenu inheritHeight>
            <Typography>
              Use flexbox alignment utilities to vertically and horizontally
              align columns.
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 36 }}>
              <Box display="flex" height={150} width={"100%"}>
                <Box alignSelf="flex-start" width={"100%"}>
                  <Grid item xs={12}>
                    <Paper
                      className={cn(classes.paperItem, classes.paperMargin)}
                      color="primary"
                    >
                      Start
                    </Paper>
                  </Grid>
                </Box>
                <Box alignSelf="center" width={"100%"}>
                  <Grid item xs={12}>
                    <Paper
                      className={cn(classes.paperItem, classes.paperMargin)}
                      color="danger"
                    >
                      Center
                    </Paper>
                  </Grid>
                </Box>
                <Box alignSelf="flex-end" width={"100%"}>
                  <Grid item xs={12}>
                    <Paper
                      className={cn(classes.paperItem, classes.paperMargin)}
                      color="warning"
                    >
                      End
                    </Paper>
                  </Grid>
                </Box>
              </Box>
              <Grid item xs zeroMinWidth>
                <Code>{`
  <Grid container>
    <Box display="flex">
      <Box alignSelf="flex-start">
        <Grid item xs={4}>One of three</Grid>
      </Box>
      <Box alignSelf="center">
        <Grid item xs={4}>One of three</Grid>
      </Box>
      <Box alignSelf="flex-end">
        <Grid item xs={4}>One of three</Grid>
      </Box>
    </Box>
  </Grid>
                  `}</Code>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item md={6} xs={12}>
          <Widget title="Vertical Alignment" disableWidgetMenu>
            <Typography>
              Use flexbox alignment utilities to vertically and horizontally
              align columns.
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 36 }}>
              <Box display="flex" width={"100%"} flexDirection="column">
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  width={"100%"}
                >
                  <Grid item xs={3}>
                    <Paper
                      className={cn(classes.paperItem, classes.paperMargin)}
                      color="primary"
                    >
                      1
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper
                      className={cn(classes.paperItem, classes.paperMargin)}
                      color="danger"
                    >
                      2
                    </Paper>
                  </Grid>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-around"
                  width={"100%"}
                >
                  <Grid item xs={3}>
                    <Paper
                      className={cn(classes.paperItem, classes.paperMargin)}
                      color="warning"
                    >
                      1
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper
                      className={cn(classes.paperItem, classes.paperMargin)}
                      color="primary"
                    >
                      2
                    </Paper>
                  </Grid>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  width={"100%"}
                >
                  <Grid item xs={3}>
                    <Paper
                      className={cn(classes.paperItem, classes.paperMargin)}
                      color="danger"
                    >
                      1
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper
                      className={cn(classes.paperItem, classes.paperMargin)}
                      color="warning"
                    >
                      2
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper
                      className={cn(classes.paperItem, classes.paperMargin)}
                      color="primary"
                    >
                      3
                    </Paper>
                  </Grid>
                </Box>
              </Box>
              <Grid item xs zeroMinWidth>
                <Code>{`
  <Box display="flex" flexDirection="column">
    <Box display="flex" flexDirection="row" justifyContent="flex-end">
      <Grid item xs={3}>1</Grid>
      <Grid item xs={3}>2</Grid>
    </Box>
    <Box display="flex" flexDirection="row" justifyContent="flex-around">
      <Grid item xs={3}>1</Grid>
      <Grid item xs={3}>2</Grid>
    </Box>
    <Box display="flex" flexDirection="row" justifyContent="flex-between">
      <Grid item xs={3}>1</Grid>
      <Grid item xs={3}>2</Grid>
      <Grid item xs={3}>3</Grid>
    </Box>
  </Box>
                  `}</Code>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(GridComp);