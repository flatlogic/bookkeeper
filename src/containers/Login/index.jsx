import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { BASE_USER_ROLES, TEMPLATE_ROUTES } from '../../config';
import Login from '../../components/Login';
import { login } from '../../redux/auth';
import {selectIsAuthenticated, selectError, selectLoading, selectUser} from '../../selectors/auth';

const styles = theme => ({
  layoutContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
  },
});

class LoginContainer extends Component {
  static propTypes = {
    classes: T.object.isRequired,
    isAuthenticated: T.bool.isRequired,
  };

  handleLogin = (username, password) => {
    this.props.login(username, password);
  };

  componentDidMount() {
    localStorage.clear();
  }

  getRedirectUrlAfterLogin = () => {
    const { user } = this.props;
    const userRoles = user.roles || [];
    const { from } = this.props.location.state || { from: { pathname: '' } };
    // let toUrl = from.pathname;


    if (userRoles.includes(BASE_USER_ROLES.admin) || userRoles.includes(BASE_USER_ROLES.superUser)) {
      return TEMPLATE_ROUTES.dashboard;
    } else {
      return '';
    }
  };

  render() {
    const { classes, isAuthenticated, error, loading } = this.props;

    if (isAuthenticated) {
      return <Redirect to={this.getRedirectUrlAfterLogin()} />;
    }

    return (
      <div className={classes.layoutContainer}>
        <Login onSubmit={this.handleLogin} error={error} loading={loading} />
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
  login,
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(LoginContainer),
  ),
);
