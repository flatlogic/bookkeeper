import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import warningImg from '../../../../../images/newImages/error.png'
import Typography from '../../../../common/Typography';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '80px 15px',
    width: '100%',
    maxWidth: 520,
    background: '#fff',
    margin: 'auto'
  },
  title: {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    fontSize: 100,
  },
  description: {
    color: theme.palette.text.defaultTheme,
    maxWidth: 300,
    textAlign: 'center',
    margin: '60px auto',
  },
  subDescription: {
    fontWeight: 100,
    marginTop: 100,
    color: theme.palette.text.defaultTheme,
  },
  link: {
    fontWeight: 600,
    color: theme.palette.text.primaryTheme,
    marginTop: 10
  }
})

const ErrorPage = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>404</Typography>
      <p className={classes.description}>Oops. Looks like the page you're looking for no longer exists</p>
      <img src={warningImg} alt="404" />
      <p className={classes.subDescription}>But we're here to bring you back to safety</p>
      <Link component={RouterLink} classes={{ root: classes.link }} to="/app/profile">Back to Home</Link>
    </div>
  )
}

export default withStyles(styles)(ErrorPage);