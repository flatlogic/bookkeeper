import { createSelector } from 'reselect';

export const selectOrgsState = createSelector(
  state => state,
  state => state.organizations,
);

export const selectList = createSelector(
  selectOrgsState,
  state => state.list,
);

export const selectItem = createSelector(
  selectOrgsState,
  state => state.item,
);

export const selectLoading = createSelector(
  selectOrgsState,
  state => state.loading,
);

export const selectFilter = createSelector(
  selectOrgsState,
  state => state.filter,
);

export const selectSorting = createSelector(
  selectOrgsState,
  state => state.sorting,
);
