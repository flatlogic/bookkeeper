import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { BASE_USER_ROLES, ADMIN_ROUTES } from '../../config';
import Signup from '../../components/Signup';
import { register } from '../../redux/auth';
import {selectIsAuthenticated, selectError, selectLoading, selectUser} from '../../selectors/auth';

const styles = theme => ({
  layoutContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
  },
});

class SignupContainer extends Component {
  static propTypes = {
    classes: T.object.isRequired,
    isAuthenticated: T.bool.isRequired,
  };

  handleRegister = (username, email, password) => {
    this.props.register(username, email, password);
  };

  componentDidMount() {
    localStorage.clear();
  }

  getRedirectUrlAfterRegister = () => {
    const { user } = this.props;
    const userRoles = user.roles || [];
    const { from } = this.props.location.state || { from: { pathname: '' } };
    // let toUrl = from.pathname;


    if (userRoles.includes(BASE_USER_ROLES.admin) || userRoles.includes(BASE_USER_ROLES.superUser)) {
      return ADMIN_ROUTES.organizationsList;
    } else {
      return '';
    }
  };

  render() {
    const { classes, isAuthenticated, error, loading } = this.props;

    if (isAuthenticated) {
      return <Redirect to={this.getRedirectUrlAfterRegister()} />;
    }

    return (
      <div className={classes.layoutContainer}>
        <Signup onSubmit={this.handleRegister} error={error} loading={loading} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  error: selectError,
  loading: selectLoading,
  user: selectUser,
});

const mapDispatchToProps = {
  register,
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(SignupContainer),
  ),
);
