import { createSelector } from 'reselect';

export const selectCompaniesState = createSelector(
  state => state,
  state => state.companies,
);

export const selectList = createSelector(
  selectCompaniesState,
  state => state.list,
);

export const selectItem = createSelector(
  selectCompaniesState,
  state => state.item,
);

export const selectLoading = createSelector(
  selectCompaniesState,
  state => state.loading,
);

export const selectFilter = createSelector(
  selectCompaniesState,
  state => state.filter,
);

export const selectSorting = createSelector(
  selectCompaniesState,
  state => state.sorting,
);
