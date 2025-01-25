import React, { Component } from 'react';
import * as T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import Card from '../common/Card';
import Input from '../common/Input';
import Typography from '../common/Typography';
import Button from '../common/Button';
import { ADMIN_ROUTES } from '../../config';

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
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 48,
    width: 'fit-content',
    padding: '0px 20px',
  },
});

class SetPassword extends Component {
  static propTypes = {
    classes: T.object.isRequired,
    onSubmit: T.func.isRequired,
    error: T.any,
  };

  state = {
    error: null,
  };

  constructor(props) {
    super(props);
    this.passwordInput = React.createRef();
    this.repeatPasswordInput = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.error !== prevProps.error) {
      this.setState({
        error: this.props.error,
      });
    }
  }

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
      await this.props.onSubmit(this.passwordInput.current.value, this.repeatPasswordInput.current.value);
      this.props.history.push(ADMIN_ROUTES.login);
    } catch (e) {}
  };

  render() {
    const { classes } = this.props;
    const { error } = this.state;

    return (
      <Card classes={{root: classes.root}} direction="row">
        <Card classes={{root: classes.formWrapper}}>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <FormControl>
              <Typography variant="h3" bold className={classes.label}>Set Password</Typography>

              <Input
                label="Password"
                inputRef={this.passwordInput}
                placeholder="Enter password"
                required
              />
              <Input
                label="Repeat password"
                type="password"
                inputRef={this.repeatPasswordInput}
                placeholder="Repeat password"
                required
                error={error}
              />

              <Button type="submit" color="primary" size="small" className={classes.submitButton}>
                Set Password
              </Button>
            </FormControl>
          </form>
        </Card>
      </Card>
    );
  }
}

export default withRouter(withStyles(styles)(SetPassword));
