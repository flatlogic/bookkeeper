import React, { Component } from 'react';
import * as T from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';

import Card from '../common/Card';
import Input from '../common/Input';
import Typography from '../common/Typography';
import Button from '../common/Button';
import logo from '../../../src/images/logo.svg';

const styles = (theme) => ({
  root: {
    backgroundColor: 'rgba(182, 193, 203, 0.13)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 460,
    width: '100%',
    padding: '62px 30px',
  },
  form: {
    maxWidth: 400,
    width: '100%',
    '& > div': {
      width: '100%',
    },
  },
  label: {
    marginBottom: 0,
  },
  loginButton: {
    marginTop: 48,
    width: 'fit-content',
    padding: '0px 20px',
  },
  passwordWrapper: {
    display: 'flex',
    position: 'relative',
    '& > div': {
      width: '100%',
    },
  },
  forgotLink: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    '& > a': {
      color: '#387CF2',
      fontSize: '0.875rem',
    }
  },
  signupLink: {
    position: 'absolute',
    bottom: -40,
    right: '50%',
    transform: 'translateX(50%)',
    '& > a': {
      color: '#387CF2',
      fontSize: '0.875rem',
    }
  },
  loginWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'   
  },
  creds: {
    textAlign: 'center',
    backgroundColor: '#F6F7F8',
    margin: '30px 0 15px 0',
    fontSize: 15,
    '& > p': {
      lineHeight: '25px',
    }
  },
  loginFooter: {
    position: 'absolute',
    maxWidth: '100%',
    fontSize: 14,
    color: theme.palette.text.primary,
    bottom: 0,
    '& > a': {
      color: '#387CF2'
    }
  }
});

class Login extends Component {
  static propTypes = {
    classes: T.object.isRequired,
    onSubmit: T.func.isRequired,
    error: T.any,
  };

  constructor(props) {
    super(props);
    this.usernameInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.usernameInput.current.value, this.passwordInput.current.value);
  };

  render() {
    const { classes, error, loading } = this.props;

    return (
      <Card classes={{root: classes.root}} direction="row">
        <Card classes={{root: classes.formWrapper}}>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <FormControl>
              <div className={classes.loginWrap}>
                <Typography variant="h3" bold className={classes.label}>Log in</Typography>
                <img src={logo} alt="logo"/>
              </div>
              <div className={classes.creds}>
                <p>This is a real app with Node.js backend - use<br />
                
                  <strong>"superUser / user"</strong><br />
                  <strong>"accountant / user"</strong><br />
                  <strong>"kfc_admin / user"</strong><br />
                  <strong>"admin / user"</strong>{' '}
              
                 to login!</p>
              </div>
              <Input
                label="Username"
                inputRef={this.usernameInput}
                placeholder="Enter your username"
                required
              />

              <div className={classes.passwordWrapper}>
                <Input
                  label="Password"
                  type="password"
                  inputRef={this.passwordInput}
                  placeholder="Enter your password here"
                  required
                  error={error}
                />

              </div>
              <Typography className={classes.forgotLink}>
                  <Link component={RouterLink} to="/password/forgot">
                    Forgot your password?
                  </Link>
                </Typography>
                <Typography className={classes.signupLink}>
                  <Link component={RouterLink} to="/signup">
                    New user? Sign up here!
                  </Link>
                </Typography>
              {/*{loading && (*/}
                {/*<span>Loading</span>*/}
              {/*)}*/}

              <Button type="submit" color="primary" size="small" className={classes.loginButton}>
                Login
              </Button>
            </FormControl>
          </form>
          <p className={classes.loginFooter}>{new Date().getFullYear()} © Bookkeeper - React Accounting Software Made by <a href="https://flatlogic.com">Flatlogic</a></p>
        </Card>
      </Card>
    );
  }
}

export default withStyles(styles)(Login);
