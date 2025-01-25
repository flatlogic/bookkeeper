import React from "react";
import {
  Grid,
  Box,
  ClickAwayListener,
  Popover,
} from "@material-ui/core";
import { withStyles, makeStyles  } from '@material-ui/core/styles';
import classNames from "classnames";

// components
import Widget from "../../components/Widget";
import { Tooltip } from "../../components/Wrappers";
import Typography from '../../../../common/Typography'
import { tooltipReducer } from './reducer';
import Button from '../../../../common/Button';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: 'rgba(0,0,0,1)',
  },
  tooltip: {
    backgroundColor: 'rgba(0,0,0,1)',
    borderRadius: 2,
    boxShadow: '0 2px 5px 0 rgba(0,0,0,.5)',
    padding: 20,
    fontSize: 15
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const styles = theme => ({
  button: {
    boxShadow: theme.customShadows.widget,
    color: theme.palette.text.primary,

    margin: theme.spacing(1),
    "&:hover": {
      boxShadow: theme.customShadows.widgetWide
    }
  },
  buttonPopover: {
    width: '100%',
    margin: 0,
  },
  buttonTooltip: {
    width: '100%',
    margin: 0,
    color: '#fff',
  },
  fixHeight: {
    overflowX: 'unset',
    overflowY: 'unset',
    minHeight: 'unset',
    padding: 20,
    cursor: 'pointer',
  }
})

function TooltipComp({ classes }) {
  const [state, dispatch] = React.useReducer(tooltipReducer, false);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Widget title="Tooltip Example" disableWidgetMenu inheritHeight>
              <Box mt={2} display={"flex"}>
                <Grid container spacing={3} alignItems="center">
                  <Grid md={6} xs={12} item>
                    <ClickAwayListener
                      onClickAway={() => dispatch({ type: "CLOSE_TOOLTIP" })}
                    >
                      <div>
                        <BootstrapTooltip
                          placement="top"
                          color={"primary"}
                          PopperProps={{
                            disablePortal: true
                          }}
                          onClose={() => dispatch({ type: "CLOSE_TOOLTIP" })}
                          open={state.tooltipOpened || false}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          title="Add"
                        >
                          <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={() => dispatch({ type: "OPEN_TOOLTIP" })}
                            className={classNames(classes.button, classes.buttonTooltip)}
                          >
                            Click to toggle a tooltip
                          </Button>
                        </BootstrapTooltip>
                      </div>
                    </ClickAwayListener>
                  </Grid>
                  <Grid md={6} xs={12} item>
                    <BootstrapTooltip
                      placement="top"
                      color={"secondary"}
                      disableFocusListener
                      disableTouchListener
                      title="Add"
                    >
                      <Button
                        variant={"contained"}
                        color={"danger"}
                        className={classNames(classes.button, classes.buttonTooltip)}
                      >
                        Hover to toggle a tooltip
                      </Button>
                    </BootstrapTooltip>
                    </Grid>
                </Grid>
              </Box>
          </Widget>
        </Grid>

        <Grid item md={6} xs={12}>
          <Widget title="Popover Example" disableWidgetMenu>
            <Box mt={2} width="100%">
              {" "}
              <Grid container spacing={3} alignItems="center">
                <Grid md={6} xs={12} item>
                  <Button
                    className={classNames(classes.button, classes.buttonPopover)}
                    color="secondary"
                    aria-describedby={
                      state.togglePopover ? "simple-popover" : undefined
                    }
                    onMouseEnter={e => 
                      dispatch({
                        type: "OPEN_HOVER_POPOVER",
                        setHoverPopoverSibling: e.currentTarget
                      })
                    }
                  >
                    Open Popover
                  </Button>
                  <Popover
                    id={state.togglePopover ? "simple-popover" : undefined}
                    open={state.togglePopover || false}
                    anchorEl={state.popoverSibling}
                    classes={{ paper: classes.fixHeight }}
                    onClose={() => dispatch({ type: "CLOSE_POPOVER" })}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center"
                    }}
                  >
                    <Typography className={classes.typography}>
                      The content of the Popover.
                    </Typography>
                  </Popover>
                </Grid>
                <Grid md={6} xs={12} item>
                  <Typography
                    aria-owns={
                      state.toggleHoverPopover
                        ? "mouse-over-popover"
                        : undefined
                    }
                    aria-haspopup="true"
                  >
                    Hover with a Popover.
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    open={state.toggleHoverPopover || false}
                    anchorEl={state.hoverPopoverSibling}
                    classes={{ paper: classes.fixHeight }}
                    anchorOrigin={{
                      vertical: 50,
                      horizontal: "left"
                    }}
                    onClick={() => dispatch({ type: "CLOSE_HOVER_POPOVER" })}
                    disableRestoreFocus
                  >
                    <Typography className={classes.typography}>
                      Click to close :)
                    </Typography>
                  </Popover>
                </Grid>
              </Grid>
            </Box>
          </Widget>
        </Grid>
        <Grid item md={6} xs={12}>
          <Widget title="Tooltip Directions" disableWidgetMenu>
            <Box mt={2} display={"flex"}>
              <Grid container spacing={3}>
                <Grid md={6} xs={12} item>
                  <ClickAwayListener
              onClickAway={() => dispatch({ type: "CLOSE_TOP_TOOLTIP" })}
            >
              <div>
                <BootstrapTooltip
                  placement="top"
                  color={"primary"}
                  PopperProps={{
                    disablePortal: true
                  }}
                  onClose={() => dispatch({ type: "CLOSE_TOP_TOOLTIP" })}
                  open={state.toggleTopTooltip || false}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="Add"
                >
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => dispatch({ type: "OPEN_TOP_TOOLTIP" })}
                    className={classNames(classes.button, classes.buttonTooltip)}
                  >
                    Tooltip on top
                  </Button>
                </BootstrapTooltip>
              </div>
            </ClickAwayListener>
                </Grid>
                <Grid md={6} xs={12} item>
                  <ClickAwayListener
                onClickAway={() => dispatch({ type: "CLOSE_RIGHT_TOOLTIP" })}
              >
                <div>
                  <BootstrapTooltip
                    placement="right"
                    color={"primary"}
                    PopperProps={{
                      disablePortal: true
                    }}
                    onClose={() => dispatch({ type: "CLOSE_RIGHT_TOOLTIP" })}
                    open={state.toggleRightTooltip || false}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Add"
                  >
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      onClick={() => dispatch({ type: "OPEN_RIGHT_TOOLTIP" })}
                      className={classNames(classes.button, classes.buttonTooltip)}
                    >
                      Tooltip on right
                    </Button>
                  </BootstrapTooltip>
                </div>
              </ClickAwayListener>
                </Grid>
                <Grid md={6} xs={12} item>
                  <ClickAwayListener
                onClickAway={() => dispatch({ type: "CLOSE_BOTTOM_TOOLTIP" })}
              >
                <div>
                  <BootstrapTooltip
                    placement="bottom"
                    color={"primary"}
                    PopperProps={{
                      disablePortal: true
                    }}
                    onClose={() => dispatch({ type: "CLOSE_BOTTOM_TOOLTIP" })}
                    open={state.toggleBottomTooltip || false}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Add"
                  >
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      onClick={() => dispatch({ type: "OPEN_BOTTOM_TOOLTIP" })}
                      className={classNames(classes.button, classes.buttonTooltip)}
                    >
                      Tooltip on bottom
                    </Button>
                  </BootstrapTooltip>
                </div>
              </ClickAwayListener>
                </Grid>
                <Grid md={6} xs={12} item>
                  <ClickAwayListener
                onClickAway={() => dispatch({ type: "CLOSE_LEFT_TOOLTIP" })}
              >
                <div>
                  <BootstrapTooltip
                    placement="left"
                    color={"primary"}
                    PopperProps={{
                      disablePortal: true
                    }}
                    onClose={() => dispatch({ type: "CLOSE_LEFT_TOOLTIP" })}
                    open={state.toggleLeftTooltip || false}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Add"
                  >
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      onClick={() => dispatch({ type: "OPEN_LEFT_TOOLTIP" })}
                      className={classNames(classes.button, classes.buttonTooltip)}
                    >
                      Tooltip on left
                    </Button>
                  </BootstrapTooltip>
                </div>
              </ClickAwayListener>
                </Grid>
              </Grid>
            </Box>
          </Widget>
        </Grid>
        <Grid item md={6} xs={12}>
          <Widget title="Popover Directions" disableWidgetMenu>
            <Box mt={2} width="100%">
              {" "}
              <Grid container spacing={3}>
                <Grid md={6} xs={12} item>
                  <Button
                    variant={"contained"}
                    color="secondary"
                    className={classNames(classes.button, classes.buttonPopover)}
                    aria-describedby={
                      state.toggleTopPopover ? "simple-popover" : undefined
                    }
                    onClick={e =>
                      dispatch({
                        type: "OPEN_TOP_POPOVER",
                        setTopPopoverSibling: e.currentTarget
                      })
                    }
                  >
                    Popover on top
                  </Button>
                  <Popover
                    id={state.toggleTopPopover ? "simple-popover" : undefined}
                    open={state.toggleTopPopover || false}
                    anchorEl={state.topPopoverSibling}
                    onClose={() => dispatch({ type: "CLOSE_TOP_POPOVER" })}
                    anchorOrigin={{
                      vertical: -10,
                      horizontal: "center"
                    }}
                    classes={{ paper: classes.fixHeight }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center"
                    }}
                  >
                    <Typography className={classes.typography}>
                      The content of the Popover.
                    </Typography>
                  </Popover>
                </Grid>
                <Grid md={6} xs={12} item>
                  <Button
                    variant={"contained"}
                    color="secondary"
                    className={classNames(classes.button, classes.buttonPopover)}
                    aria-describedby={
                      state.toggleRightPopover ? "simple-popover" : undefined
                    }
                    onClick={e =>
                      dispatch({
                        type: "OPEN_RIGHT_POPOVER",
                        setRightPopoverSibling: e.currentTarget
                      })
                    }
                  >
                    Popover on right
                  </Button>
                  <Popover
                    id={state.toggleRightPopover ? "simple-popover" : undefined}
                    open={state.toggleRightPopover || false}
                    anchorEl={state.rightPopoverSibling}
                    classes={{ paper: classes.fixHeight }}
                    onClose={() => dispatch({ type: "CLOSE_RIGHT_POPOVER" })}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "center",
                      horizontal: "left"
                    }}
                  >
                    <Typography className={classes.typography}>
                      The content of the Popover.
                    </Typography>
                  </Popover>
                </Grid>
                <Grid md={6} xs={12} item>
                  <Button
                    variant={"contained"}
                    color="secondary"
                    className={classNames(classes.button, classes.buttonPopover)}
                    aria-describedby={
                      state.toggleBottomPopover ? "simple-popover" : undefined
                    }
                    onClick={e =>
                      dispatch({
                        type: "OPEN_BOTTOM_POPOVER",
                        setBottomPopoverSibling: e.currentTarget
                      })
                    }
                  >
                    Popover on bottom
                  </Button>
                  <Popover
                    id={
                      state.toggleBottomPopover ? "simple-popover" : undefined
                    }
                    open={state.toggleBottomPopover || false}
                    anchorEl={state.bottomPopoverSibling}
                    onClose={() => dispatch({ type: "CLOSE_BOTTOM_POPOVER" })}
                    classes={{ paper: classes.fixHeight }}
                    anchorOrigin={{
                      vertical: 50,
                      horizontal: "center"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center"
                    }}
                  >
                    <Typography className={classes.typography}>
                      The content of the Popover.
                    </Typography>
                  </Popover>
                </Grid>
                <Grid md={6} xs={12} item>
                  <Button
                    variant={"contained"}
                    color="secondary"
                    className={classNames(classes.button, classes.buttonPopover)}
                    aria-describedby={
                      state.toggleLeftPopover ? "simple-popover" : undefined
                    }
                    onClick={e =>
                      dispatch({
                        type: "OPEN_LEFT_POPOVER",
                        setLeftPopoverSibling: e.currentTarget
                      })
                    }
                  >
                    Popover on left
                  </Button>
                  <Popover
                    id={state.toggleLeftPopover ? "simple-popover" : undefined}
                    open={state.toggleLeftPopover || false}
                    anchorEl={state.leftPopoverSibling}
                    classes={{ paper: classes.fixHeight }}
                    onClose={() => dispatch({ type: "CLOSE_LEFT_POPOVER" })}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "left"
                    }}
                    transformOrigin={{
                      vertical: "center",
                      horizontal: "right"
                    }}
                  >
                    <Typography className={classes.typography}>
                      The content of the Popover.
                    </Typography>
                  </Popover>
                </Grid>
              </Grid>
            </Box>
          </Widget>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(TooltipComp)