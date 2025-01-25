import { createSelector } from 'reselect';

export const selectDictionariesState = createSelector(
  state => state,
  state => state.dictionaries,
);

export const selectUsers = createSelector(
  selectDictionariesState,
  state => state.users || [],
);

export const selectRoles = createSelector(
  selectDictionariesState,
  state => state.roles || [],
);

export const selectCompanies = createSelector(
  selectDictionariesState,
  state => state.companies || [],
);

export const selectOrganizations = createSelector(
  selectDictionariesState,
  state => state.organizations || [],
);
