import { createSelector } from 'reselect';

export const selectRolesState = createSelector(
  state => state,
  state => state.roles,
);

export const selectList = createSelector(
  selectRolesState,
  state => state.list,
);

export const selectItem = createSelector(
  selectRolesState,
  state => state.item,
);

export const selectLoading = createSelector(
  selectRolesState,
  state => state.loading,
);

export const selectFilter = createSelector(
  selectRolesState,
  state => state.filter,
);

export const selectSorting = createSelector(
  selectRolesState,
  state => state.sorting,
);
