import get from 'lodash/get';

import * as UserApi from '../api/user';
import { setFlashMessage } from './app';
import { ActionTypes as AuthActionTypes } from './auth';

/**
 * Initial State
 */
const initialState = {
  company: null,
};

/**
 * Action types
 */
const prefix = 'user';
export const ActionTypes = {
  SELECT_COMPANY: `${prefix}/SELECT_COMPANY`,
  UPDATE_USER: `${prefix}/UPDATE_USER`,
  UPDATE_USER_SUCCESS: `${prefix}/UPDATE_USER_SUCCESS`,
};

/**
 * Actions
 */
export function selectCompany(company) {
  return async dispatch => {
    dispatch({
      type: ActionTypes.SELECT_COMPANY,
      payload: company,
    });

    try {
      await UserApi.selectCompany(company.id);
    } catch (e) {
      dispatch(setFlashMessage('Cannot save selected company', 'errorTheme'));
    }
  };
}

export function updateUser(data) {
  return async dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_USER,
    });

    try {
      await UserApi.updateUser(data);
      dispatch({
        type: ActionTypes.UPDATE_USER_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch(setFlashMessage('Cannot update user', 'errorTheme'));
    }
  };
}

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SELECT_COMPANY:
      return { ...state, company: action.payload };
    case AuthActionTypes.LOGIN_SUCCESS: {
      return { ...state, company: get(action.payload, 'user.lastCompanySelected', null) };
    }
    case ActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
