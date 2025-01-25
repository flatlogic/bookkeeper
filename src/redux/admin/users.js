import get from 'lodash/get';

import * as UsersApi from '../../api/admin/users';
import { setFlashMessage } from '../app';
import { selectFilter, selectSorting } from '../../selectors/admin/users';

/**
 * Initial State
 */
const initialState = {
  list: [],
  item: null,
  loading: false,
  filter: {},
  sorting: {},
  errors: {
    common: null,
  },
};

/**
 * Action types
 */
const prefix = 'users';
export const ActionTypes = {
  FETCH_LIST: `${prefix}/FETCH_LIST`,
  FETCH_LIST_SUCCESS: `${prefix}/FETCH_LIST_SUCCESS`,
  FETCH_ITEM: `${prefix}/FETCH_ITEM`,
  FETCH_ITEM_SUCCESS: `${prefix}/FETCH_ITEM_SUCCESS`,
  FILTER_UPDATE: `${prefix}/FILTER_UPDATE`,
  RESET_FILTER: `${prefix}/RESET_FILTER`,
  UPDATE_SORTING: `${prefix}/UPDATE_SORTING`,
  SET_ERRORS: `${prefix}/SET_ERRORS`,
  RESET_ERRORS: `${prefix}/RESET_ERRORS`,
  ITEM_STATUS_UPDATE_SUCCESS: `${prefix}/ITEM_STATUS_UPDATE_SUCCESS`,
  ITEM_STATUS_UPDATE_FAIL: `${prefix}/ITEM_STATUS_UPDATE_FAIL`,
};

/**
 * Actions
 */
export function init() {
  return dispatch => {
    dispatch({
      type: ActionTypes.RESET_FILTER,
    });
    dispatch(fetchList());
  };
}

export function fetchList() {
  return async (dispatch, getState) => {
    const filter = selectFilter(getState());
    const sorting = selectSorting(getState());
    try {
      dispatch({
        type: ActionTypes.FETCH_LIST,
      });
      const list = await UsersApi.fetchList({...filter, ...sorting});
      dispatch({
        type: ActionTypes.FETCH_LIST_SUCCESS,
        payload: list,
      });
    } catch (e) {
      dispatch(setFlashMessage('Cannot load users', 'errorTheme'));
    }
  };
}

export function fetchItem(id, justFetch) {
  return async dispatch => {
    try {
      dispatch({
        type: ActionTypes.FETCH_ITEM,
      });
      const item = await UsersApi.fetchItem(id);
      if (justFetch) {
        return item;
      }
      dispatch({
        type: ActionTypes.FETCH_ITEM_SUCCESS,
        payload: item,
      });
    } catch (e) {
      dispatch(setFlashMessage('Cannot load user', 'errorTheme'));
    }
  };
}

export function create(data, organization) {
  return async dispatch => {
    try {
      const result = await UsersApi.create(data, organization);
      dispatch(fetchList());
      dispatch(sendInvitation(result.id));
    } catch (e) {
      if (e.response.data.modelErrors) {
        throw e.response.data.modelErrors;
      } else {
        dispatch(setFlashMessage('Cannot create user', 'errorTheme'));
      }
    }
  };
}

export function update(id, data) {
  return async dispatch => {
    try {
      await UsersApi.update(id, data);
      dispatch(fetchList());
    } catch (e) {
      if (e.response.data.modelErrors) {
        throw e.response.data.modelErrors;
      } else {
        dispatch(setFlashMessage(`Cannot update user. ${get(e.response, 'data.errors.message', 'errorTheme')}`));
      }
    }
  };
}

export function setRoles(userId, roles) {
  return async dispatch => {
    try {
      await UsersApi.setRoles(userId, roles);
      dispatch(fetchList());
    } catch (e) {
      dispatch(setFlashMessage('Cannot update user roles', 'errorTheme'));
      throw e;
    }
  };
}

export function sendInvitation(userId, withFlashMessage) {
  return async dispatch => {
    try {
      await UsersApi.sendInvitation(userId);
      if (withFlashMessage) {
        dispatch(setFlashMessage('Activation email sent', 'successTheme'));
      }
    } catch (e) {
      dispatch(setFlashMessage('Cannot send invitation', 'errorTheme'));
      throw e;
    }
  };
}

export function deleteUsers(ids) {
  return async dispatch => {
    try {
      await Promise.all(
        ids.map(id => UsersApi.deleteSuperUser(id))
      );
      dispatch(fetchList());
    } catch (e) {
      dispatch(setFlashMessage('Cannot delete user', 'errorTheme'));
      throw e;
    }
  };
}

export function onStatusChange(id, value) {
  return async dispatch => {
    try {
      dispatch({
        type: ActionTypes.ITEM_STATUS_UPDATE_SUCCESS,
        payload: {
          value,
          id,
        },
      });
      await UsersApi.changeStatus(id, value ? 1 : 0);
      dispatch(fetchList());
    } catch (e) {
      dispatch(setFlashMessage('Cannot update status', 'errorTheme'));
      dispatch({
        type: ActionTypes.ITEM_STATUS_UPDATE_FAIL,
        payload: {
          value: !value,
          id,
        },
      });
      throw e;
    }
  };
}


export function updateFilter(name, value) {
  return async dispatch => {
    try {
      dispatch({
        type: ActionTypes.FILTER_UPDATE,
        payload: {
          name,
          value,
        },
      });
      dispatch(fetchList());
    } catch (e) {
      dispatch(setFlashMessage('Cannot update filter', 'errorTheme'));
    }
  };
}

export function updateSorting({sortKey, sortOrder}) {
  return async dispatch => {
    try {
      dispatch({
        type: ActionTypes.UPDATE_SORTING,
        payload: {
          sortKey,
          sortOrder,
        },
      });
      dispatch(fetchList());
    } catch (e) {
      dispatch(setFlashMessage('Cannot update sorting', 'errorTheme'));
    }
  };
}

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case ActionTypes.FETCH_ITEM_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false,
      };
    case ActionTypes.FETCH_LIST:
    case ActionTypes.FETCH_ITEM:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.FILTER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.name]: action.payload.value,
        },
      };
    case ActionTypes.RESET_FILTER:
      return {
        ...state,
        filter: {},
      };
    case ActionTypes.UPDATE_SORTING:
      return {
        ...state,
        sorting: {
          sortKey: action.payload.sortKey,
          sortOrder: action.payload.sortOrder,
        },
      };
    case ActionTypes.SET_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.path]: action.payload,
        },
      };
    case ActionTypes.RESET_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case ActionTypes.ITEM_STATUS_UPDATE_SUCCESS:
    case ActionTypes.ITEM_STATUS_UPDATE_FAIL:
      return {
        ...state,
        list: state.list.map(item => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              status: action.payload.value,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
