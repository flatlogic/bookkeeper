import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as T from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import ResetPassword from '../../components/Password/resetPassword';
import { resetPassword } from '../../redux/auth';
import { selectError, selectLoading } from '../../selectors/auth';

const styles = () => ({
  layoutContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
  },
  error: {
    marginTop: 100,
  },
});

class ResetPasswordContainer extends Component {
  static propTypes = {
    classes: T.object.isRequired,
  };

  handleSubmit = username => {
    return this.props.resetPassword(username);
  };

  render() {
    const { classes, error, loading } = this.props;

    return (
      <div className={classes.layoutContainer}>
        <ResetPassword onSubmit={this.handleSubmit} error={error} loading={loading} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: selectError,
  loading: selectLoading,
});

const mapDispatchToProps = {
  resetPassword,
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(ResetPasswordContainer),
  ),
);
