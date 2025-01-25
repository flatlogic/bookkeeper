import React, { Component } from 'react';
import * as T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import Card from '../common/Card';
import Input from '../common/Input';
import Typography from '../common/Typography';
import Button from '../common/Button';
import {ADMIN_ROUTES} from '../../config';

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
    isReset: false,
  };

  constructor(props) {
    super(props);
    this.usernameInput = React.createRef();
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

    const username = this.usernameInput.current.value;
    if (!username) {
      this.setState({error: 'Username cannot be empty'});
      return;
    } else {
      this.setState({error: null});
    }

    try {
      this.setState({loading: true});
      await this.props.onSubmit(username);
      this.setState({ isReset: true });
    } catch (e) {}
    this.setState({loading: false});
  };

  render() {
    const { classes } = this.props;
    const { error, isReset, loading } = this.state;

    return (
      <Card classes={{root: classes.root}} direction="row">
        <Card classes={{root: classes.formWrapper}}>
          {!isReset ?
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <FormControl>
                <Typography variant="h3" bold className={classes.label}>Reset Password</Typography>

                <Input
                  label="Username"
                  inputRef={this.usernameInput}
                  placeholder="Enter username"
                  required
                  forceErrorDisplay
                  error={error}
                />

                <Button type="submit" color="primary" size="small" className={classes.submitButton} disabled={loading}>
                  Reset Password
                </Button>
              </FormControl>
            </form> :
            <Typography variant="h4">Instructions were sent to your email</Typography>
          }
        </Card>
      </Card>
    );
  }
}

export default withRouter(withStyles(styles)(SetPassword));
