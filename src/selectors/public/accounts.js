import { createSelector } from 'reselect';

export const selectAccountsState = createSelector(
  state => state,
  state => state.accounts,
);

export const selectList = createSelector(
  selectAccountsState,
  state => state.list,
);

export const selectItem = createSelector(
  selectAccountsState,
  state => state.item,
);

export const selectLoading = createSelector(
  selectAccountsState,
  state => state.loading,
);

export const selectFilter = createSelector(
  selectAccountsState,
  state => state.filter,
);

export const selectSorting = createSelector(
  selectAccountsState,
  state => state.sorting,
);

export const selectFiscalYear = createSelector(
  selectFilter,
  filter => filter.fiscalYear,
);
