import React from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import difference from 'lodash/difference';

import { selectIsAuthenticated, selectUser, selectUserCompanyPermissions } from '../../selectors/auth';
import { BASE_USER_ROLES } from '../../config';

export const checkIfAllowedSpecialUsers = (roles, user) => {
  if (
    !roles || (
    !roles.includes(BASE_USER_ROLES.superUser) && !roles.includes(BASE_USER_ROLES.admin) && (
      user.roles.includes(BASE_USER_ROLES.superUser) || user.roles.includes(BASE_USER_ROLES.admin)
    ))
  ) {
    return true;
  }
};

export const supportRoles = (roles, user) => {
  if (!roles) {
    return true;
  }
  if (user.roles) {
    return roles.some(item => user.roles.includes(item));    
  }
};

export const supportPermissions = (permissions, userPermissions) => {
  if (!permissions) {
    return true;
  }
  if (!userPermissions) {
    return false;
  }

  return !Object.keys(permissions).some(pName => difference(permissions[pName], userPermissions[pName]).length);
};

class ProtectedArea extends React.PureComponent {
  static propTypes = {
    children: T.node.isRequired,
    roles: T.arrayOf(T.string).isRequired,
    permissions: T.object, // {'gGeneralLedger': ['read', 'write'], 'pJob': ['read']}
    withRedirect: T.string, // if have to redirect user without needed permissions to url
  };

  render() {
    const { isAuthenticated, user, userCompanyPermissions, children, roles, permissions, withRedirect } = this.props;

    if (
      isAuthenticated && user && (
        checkIfAllowedSpecialUsers(roles, user) || (supportRoles(roles, user) && supportPermissions(permissions, userCompanyPermissions))
    )) {
      return children;
    } else if (withRedirect) {
        return <Redirect to={withRedirect} />;
    } else {
      return null;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  user: selectUser,
  userCompanyPermissions: selectUserCompanyPermissions,
});


export default connect(mapStateToProps)(ProtectedArea);
