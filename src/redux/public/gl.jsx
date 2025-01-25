import * as GlApi from '../../api/public/gl';
import { setFlashMessage } from '../app';
import { ActionTypes as UserActionTypes } from '../user';

/**
 * Initial State
 */
const initialState = {

};

/**
 * Action types
 */
const prefix = 'gl';
export const ActionTypes = {
  FETCH_CONFIG: `${prefix}/FETCH_CONFIG`,
  FETCH_CONFIG_SUCCESS: `${prefix}/FETCH_LIST_SUCCESS`,
  UPDATE_CONFIG: `${prefix}/UPDATE_CONFIG`,
  UPDATE_CONFIG_SUCCESS: `${prefix}/UPDATE_CONFIG_SUCCESS`,
};

/**
 * Actions
 */
export function fetchConfig() {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ActionTypes.FETCH_CONFIG,
      });
      const config = await GlApi.fetchGLConfig();
      dispatch({
        type: ActionTypes.FETCH_CONFIG_SUCCESS,
        payload: config,
      });
      return config;
    } catch (e) {}
  };
}

export function updateConfig(data) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ActionTypes.UPDATE_CONFIG,
      });
      await GlApi.saveGLConfig(data);
      dispatch({
        type: ActionTypes.UPDATE_CONFIG_SUCCESS,
      });
    } catch (e) {
      dispatch(setFlashMessage('Cannot save GL config'));
      throw e;
    }
  };
}

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UserActionTypes.SELECT_COMPANY:
      return initialState;
    default:
      return state;
  }
}
