import React from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectIsAuthenticated, selectUser, selectUserCompanyPermissions } from '../../selectors/auth';
import { checkIfAllowedSpecialUsers, supportRoles, supportPermissions } from '../ProtectedArea';

export const getLoginRedirect = props => {
  const { location } = props;

  return {
    pathname: '/login',
    state: { from: location },
  };
};

class ProtectedRoute extends Route {
  static propTypes = {
    roles: T.arrayOf(T.string).isRequired,
    permissions: T.object, // {'gGeneralLedger': ['read', 'write'], 'pJob': ['read']}
  };

  getRenderComponent = routeProps => {
    const { component: Component, isAuthenticated, roles, user, permissions, userCompanyPermissions } = this.props;

    if (!isAuthenticated) {
      return <Redirect to={getLoginRedirect(routeProps)}/>;
    } else if (
      checkIfAllowedSpecialUsers(roles, user) || (supportRoles(roles, user) && supportPermissions(permissions, userCompanyPermissions))
    ) {
      return <Component {...routeProps} />;
    }
    return null;
  };

  render() {
    const { component: Component, isAuthenticated, user, roles, permissions, userCompanyPermissions, ...rest } = this.props;

    return <Route {...rest} render={props => this.getRenderComponent(props)} />;
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  user: selectUser,
  userCompanyPermissions: selectUserCompanyPermissions,
});


export default withRouter(connect(mapStateToProps)(ProtectedRoute));
