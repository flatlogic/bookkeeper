import React, { Component } from 'react';
import * as T from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';

import Card from '../common/Card';
import { TEMPLATE_ROUTES } from '../../config';
import Input from '../common/Input';
import Typography from '../common/Typography';
import Button from '../common/Button';
import logo from '../../../src/images/logo.svg';

const styles = () => ({
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
  signupButton: {
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
  signupWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'   
  }
});

class Signup extends Component {
  static propTypes = {
    classes: T.object.isRequired,
    onSubmit: T.func.isRequired,
    error: T.any,
  };

  constructor(props) {
    super(props);
    this.usernameInput = React.createRef();
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.repeatPasswordInput = React.createRef();
  }

  state = {
    error: null,
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.props.loading) return;
    const password = this.passwordInput.current.value;
    const repeatPassword = this.repeatPasswordInput.current.value;
    if (password !== repeatPassword) {
      this.setState({error: 'Passwords do not match'});
    } else {
      this.setState({error: null});
    }

    try {
      await this.props.onSubmit(this.usernameInput.current.value, this.passwordInput.current.value, this.emailInput.current.value);
      this.props.history.push(TEMPLATE_ROUTES.dashboard);
    } catch (e) {}
  };

  render() {
    const { classes, loading } = this.props;
    const { error } = this.state;

    return (
      <Card classes={{root: classes.root}} direction="row">
        <Card classes={{root: classes.formWrapper}}>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <FormControl>
              <div className={classes.signupWrap}>
                <Typography variant="h3" bold className={classes.label}>Sign Up</Typography>
                <img src={logo} alt="logo"/>
              </div>

              <Input
                label="Username"
                inputRef={this.usernameInput}
                placeholder="Enter your username"
                required
              />

              <Input
                label="Email"
                inputRef={this.emailInput}
                placeholder="Enter your email"
                required
              />

              <div className={classes.passwordWrapper}>
                <Input
                  label="Password"
                  type="password"
                  inputRef={this.passwordInput}
                  placeholder="Enter your password here"
                  required
                />

              </div>

              <div className={classes.passwordWrapper}>
                <Input
                  label="Repeat Password"
                  type="password"
                  inputRef={this.repeatPasswordInput}
                  placeholder="Enter your password here"
                  required
                  error={error}
                />

              </div>

              <Typography className={classes.forgotLink}>
                  <Link component={RouterLink} to="/login">
                    Back to sign in
                  </Link>
                </Typography>
              {/*{loading && (*/}
                {/*<span>Loading</span>*/}
              {/*)}*/}

              <Button type="submit" color="primary" size="small" className={classes.signupButton}>
                Sign up
              </Button>
            </FormControl>
          </form>
        </Card>
      </Card>
    );
  }
}

export default withRouter(withStyles(styles)(Signup));
