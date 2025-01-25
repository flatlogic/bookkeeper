import { createSelector } from 'reselect';

export const selectSuperUsersState = createSelector(
  state => state,
  state => state.superUsers,
);

export const selectList = createSelector(
  selectSuperUsersState,
  state => state.list,
);

export const selectItem = createSelector(
  selectSuperUsersState,
  state => state.item,
);

export const selectLoading = createSelector(
  selectSuperUsersState,
  state => state.loading,
);

export const selectFilter = createSelector(
  selectSuperUsersState,
  state => state.filter,
);

export const selectSorting = createSelector(
  selectSuperUsersState,
  state => state.sorting,
);
