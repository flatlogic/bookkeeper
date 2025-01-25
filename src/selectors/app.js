import { createSelector } from 'reselect';
import { isEmpty } from '../services/string'

export const selectAppState = createSelector(
  state => state,
  state => state.app,
);

export const selectFlashMessage = createSelector(
  selectAppState,
  state => !isEmpty(state.flashMessage) ? state.flashMessage : null,
);
