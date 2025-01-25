import { createSelector } from 'reselect';

export const selectAuthState = createSelector(
  state => state,
  state => state.auth,
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  state => state.isAuthenticated,
);

export const selectUser = createSelector(
  selectAuthState,
  state => state.user ? state.user : null,
);

export const selectError = createSelector(
  selectAuthState,
  state => state.error,
);

export const selectLoading = createSelector(
  selectAuthState,
  state => state.loading,
);

export const selectUserCompanyPermissions = createSelector(
  selectUser,
  user => {
    if (!user) {
      return {};
    }

    const allowedPermissionsList = ['pGeneralLedger', 'pJobCost'];
    const currentCompany = 4;

    return user.companyRoles
      .filter(item => item.companyId === currentCompany)
      .map(item => item.role)
      .reduce((map, item) => {
        map = allowedPermissionsList.reduce((m, permissionName) => {
          m[permissionName] = m[permissionName] || [];
          if (item[permissionName]) {
            m[permissionName].push(...item[permissionName]);
          }
          return m;
        }, map);
        return map;
      }, {});
  }
);

export const selectUserCompanies = createSelector(
  selectUser,
  user => {
    if (!user) {
      return [];
    }

    return user.companyRoles
      .map(item => item.company);
  }
);
