import { createSelector } from 'reselect';

export const selectSubAccountsState = createSelector(
  state => state,
  state => state.subAccounts,
);

export const selectList = createSelector(
  selectSubAccountsState,
  state => state.list,
);

export const selectItem = createSelector(
  selectSubAccountsState,
  state => state.item,
);

export const selectLoading = createSelector(
  selectSubAccountsState,
  state => state.loading,
);

export const selectFilter = createSelector(
  selectSubAccountsState,
  state => state.filter,
);

export const selectSorting = createSelector(
  selectSubAccountsState,
  state => state.sorting,
);
