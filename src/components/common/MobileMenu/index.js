import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import {
  useLayoutDispatch,
  toggleSidebar
} from "../../common/Sidebar/LayoutContext";

const styles = theme => ({
  menuButton: {
    marginLeft: -2,
    [theme.breakpoints.down("sm")]: {
      margin: 5
    }
  },
})

function MobileMenu({ classes, width }) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const layoutDispatch = useLayoutDispatch();

  return (
    <>
    {isWidthDown('sm', width) && (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => toggleSidebar(layoutDispatch)}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>      
    )}
  </>
  )
}

export default withStyles(styles)(withWidth()(MobileMenu));