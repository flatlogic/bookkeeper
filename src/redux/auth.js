import get from 'lodash/get';

import * as AuthApi from '../api/auth';
import { ActionTypes as UserActionTypes } from './user';
import { setFlashMessage } from './app';
/**
 * Initial State
 */
const initialState = {
  user: null,
  jwt: null,
  company: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

/**
 * Action types
 */
const prefix = 'auth';
export const ActionTypes = {
  LOGIN: `${prefix}/LOGIN`,
  LOGIN_SUCCESS: `${prefix}/LOGIN_SUCCESS`,
  LOGIN_FAILED: `${prefix}/LOGIN_FAILED`,
  REGISTER: `${prefix}/REGISTER`,
  REGISTER_SUCCESS: `${prefix}/REGISTER_SUCCESS`,
  REGISTER_FAILED: `${prefix}/REGISTER_FAILED`,
  FAIL: `${prefix}/FAIL`,
  LOGOUT: `${prefix}/LOGOUT`,
  FORGOT: `${prefix}/FORGOT`,
  FORGOT_SUCCESS: `${prefix}/FORGOT_SUCCESS`,
  FORGOT_FAIL: `${prefix}/FORGOT_FAIL`,
  SIGNUP: `${prefix}/SIGNUP`,
  SIGNUP_SUCCESS: `${prefix}/SIGNUP_SUCCESS`,
  SIGNUP_FAIL: `${prefix}/SIGNUP_FAIL`,
  CHANGE_PASSWORD: `${prefix}/CHANGE_PASSWORD`,
  CHANGE_PASSWORD_SUCCESS: `${prefix}/CHANGE_PASSWORD_SUCCESS`,
  CHANGE_PASSWORD_FAIL: `${prefix}/CHANGE_PASSWORD_FAIL`,
  SET_PASSWORD: `${prefix}/SET_PASSWORD`,
  SET_PASSWORD_SUCCESS: `${prefix}/SET_PASSWORD_SUCCESS`,
  SET_PASSWORD_FAIL: `${prefix}/SET_PASSWORD_FAIL`,
  RESET_PASSWORD: `${prefix}/RESET_PASSWORD`,
  RESET_PASSWORD_SUCCESS: `${prefix}/RESET_PASSWORD_SUCCESS`,
  RESET_PASSWORD_FAIL: `${prefix}/RESET_PASSWORD_FAIL`,
  RESET_ERRORS: `${prefix}/RESET_ERRORS`,
};

/**
 * Actions
 */
export function fail(error) {
  return {
    type: ActionTypes.FAIL,
    payload: error,
  };
}

export function register(username, email, password) {
  return async dispatch => {
    if (!username || !password || !email) {
      dispatch(fail('Please enter user credentials'));
      return;
    }
    try {
      dispatch({
        type: ActionTypes.REGISTER,
      });
      const user = await AuthApi.register(username, email, password);
      // set JWT right after request to have token in store before render Protected component
      localStorage.setItem('jwt', user.token);
      dispatch({
        type: ActionTypes.REGISTER_SUCCESS,
        payload: user,
      });
      dispatch(setFlashMessage('Registration Completed', 'successTheme'));
    } catch (e) {
      dispatch({
        type: ActionTypes.REGISTER_FAILED,
      });
      dispatch(fail(get(e.response, 'data.errors.message')));
    }
  };
}

export function login(username, password) {
  return async dispatch => {
    if (!username || !password) {
      dispatch(fail('Please enter user credentials'));
      return;
    }
    try {
      dispatch({
        type: ActionTypes.LOGIN,
      });
      const user = await AuthApi.login(username, password);
      // set JWT right after request to have token in store before render Protected component
      localStorage.setItem('jwt', user.token);
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: user,
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.LOGIN_FAILED,
      });
      dispatch(fail(get(e.response, 'data.errors.message')));
    }
  };
}

export function setPassword(password, repeatPassword, token) {
  return async dispatch => {
    try {
      dispatch({
        type: ActionTypes.SET_PASSWORD,
      });
      await AuthApi.setPassword(password, repeatPassword, token);
      dispatch({
        type: ActionTypes.SET_PASSWORD_SUCCESS,
      });
    } catch (e) {
      dispatch(fail(get(e.response, 'data.errors.message')));
      throw e;
    }
  };
}

export function resetPassword(username) {
  return async dispatch => {
    try {
      dispatch({
        type: ActionTypes.RESET_PASSWORD,
      });
      await AuthApi.resetPassword(username);
      dispatch({
        type: ActionTypes.RESET_PASSWORD_SUCCESS,
      });
    } catch (e) {
      dispatch(fail(get(e.response, 'data.errors.message')));
      throw e;
    }
  };
}

export function logout() {
  return async dispatch => {
    try {
      localStorage.removeItem('store');
      localStorage.removeItem('jwt');
      // await AuthApi.logout();
      dispatch({
        type: ActionTypes.LOGOUT,
      });
    } catch (e) {}
  };
}

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      case ActionTypes.REGISTER:
    case ActionTypes.SET_PASSWORD:
    case ActionTypes.RESET_PASSWORD:
      return { ...state, error: null, loading: true };
    case ActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        jwt: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: '',
      };
    }
    case ActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        jwt: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: '',
      };
    }
    case ActionTypes.SET_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
      };
    }
    case ActionTypes.RESET_PASSWORD_SUCCESS:
      return { ...state, error: null, loading: false };
    case ActionTypes.FAIL:
      return { ...state, error: action.payload, loading: false };
    case ActionTypes.RESET_ERRORS:
      return { ...state, error: null, loading: false };
    case ActionTypes.LOGIN_FAILED:
    case ActionTypes.REGISTER_FAILED:
      return { ...state, loading: false };
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        }
      };
    case ActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
