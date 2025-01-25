import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    color: theme.palette.link.main,
    textDecoration: 'none',
    fontSize: '0.875rem',
  }
});

const Link = ({ value, data, callbacks, classes, ...props }) => (
  <a href="#"
     className={classes.root}
     onClick={e => { e.preventDefault(); callbacks.onClick && callbacks.onClick(data, e) }}
     {...props}
  >{value}</a>
);

export default withStyles(styles)(Link);
