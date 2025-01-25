import { createSelector } from 'reselect';

export const selectUserState = createSelector(
  state => state,
  state => state.user,
);

export const selectCompany = createSelector(
  selectUserState,
  state => state.company,
);
