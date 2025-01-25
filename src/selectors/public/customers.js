import { createSelector } from 'reselect';

export const selectCustomersState = createSelector(
  state => state,
  state => state.customers,
);

export const selectList = createSelector(
  selectCustomersState,
  state => state.list,
);

export const selectItem = createSelector(
  selectCustomersState,
  state => state.item,
);

export const selectLoading = createSelector(
  selectCustomersState,
  state => state.loading,
);

export const selectFilter = createSelector(
  selectCustomersState,
  state => state.filter,
);

export const selectSorting = createSelector(
  selectCustomersState,
  state => state.sorting,
);
