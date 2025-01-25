import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import { BASE_USER_ROLES } from '../../../config';

const styles = () => ({
  root: {
    padding: '70px 0px',
    color: '#9d9d9d',
  },
});

function NoDataNotice({ children, classes, viewStatus, className = '', ...other }) {
  return (
    <Typography variant="subtitle1" align="center" className={`${classes.root} ${className}`} {...other}>
      {!!children && children}
      {!children && <span>{viewStatus === BASE_USER_ROLES.superUser ? 'You do not have enough permissions' : 'No Results To Display'}</span>}
    </Typography>
  );
}

export default withStyles(styles)(NoDataNotice);
