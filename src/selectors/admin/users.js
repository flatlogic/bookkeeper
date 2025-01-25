import { createSelector } from 'reselect';

export const selectUsersState = createSelector(
  state => state,
  state => state.users,
);

export const selectList = createSelector(
  selectUsersState,
  state => state.list,
);

export const selectItem = createSelector(
  selectUsersState,
  state => state.item,
);

export const selectLoading = createSelector(
  selectUsersState,
  state => state.loading,
);

export const selectFilter = createSelector(
  selectUsersState,
  state => state.filter,
);

export const selectSorting = createSelector(
  selectUsersState,
  state => state.sorting,
);
