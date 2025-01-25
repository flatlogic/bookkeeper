import get from 'lodash/get';

import * as AccountsApi from '../../api/public/accounts';
import { setFlashMessage } from '../app';
import { selectFilter, selectSorting } from '../../selectors/public/accounts';
import { ActionTypes as UserActionTypes } from '../user';

/**
 * Initial State
 */
const initialState = {
  list: [],
  item: null,
  loading: false,
  filter: {
    fiscalYear: 2019, // ToDO: Change fiscalYear logic
  },
  sorting: {},
  errors: {
    common: null,
  },
};

/**
 * Action types
 */
const prefix = 'accounts';
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

export function fetchList(justData) {
  return async (dispatch, getState) => {
    const filter = selectFilter(getState());
    const sorting = selectSorting(getState());

    try {
      if (justData) {
        return await AccountsApi.fetchList({}, filter.fiscalYear);
      }

      dispatch({
        type: ActionTypes.FETCH_LIST,
      });
      const list = await AccountsApi.fetchList({...filter, fiscalYear: undefined, ...sorting}, filter.fiscalYear);
      dispatch({
        type: ActionTypes.FETCH_LIST_SUCCESS,
        payload: list,
      });
    } catch (e) {
      dispatch(setFlashMessage('Cannot load accounts', 'errorTheme'));
    }
  };
}

export function fetchItem(id) {
  return async dispatch => {
    try {
      dispatch({
        type: ActionTypes.FETCH_ITEM,
      });
      const item = await AccountsApi.fetchItem(id);
      dispatch({
        type: ActionTypes.FETCH_ITEM_SUCCESS,
        payload: item,
      });
    } catch (e) {
      dispatch(setFlashMessage('Cannot load account', 'errorTheme'));
    }
  };
}

export function create(data) {
  return async (dispatch, getState) => {
    const filter = selectFilter(getState());

    try {
      await AccountsApi.create(data, filter.fiscalYear);
      dispatch(fetchList());
    } catch (e) {
      if (e.response.data.modelErrors) {
        throw e.response.data.modelErrors;
      } else if (e.response.data.reqErrors) {
        dispatch(setFlashMessage(get(e.response.data, 'reqErrors.0.msg'), 'errorTheme'));
        throw [];
      } else {
        dispatch(setFlashMessage('Cannot create account', 'errorTheme'));
        throw [];
      }
    }
  };
}

export function update(id, data) {
  return async dispatch => {
    try {
      await AccountsApi.update(id, data);
      dispatch(fetchList());
    } catch (e) {
      if (e.response.data.modelErrors) {
        throw e.response.data.modelErrors;
      } else if (e.response.data.reqErrors) {
        dispatch(setFlashMessage(get(e.response.data, 'reqErrors.0.msg'), 'errorTheme'));
        throw [];
      } else {
        dispatch(setFlashMessage('Cannot update account', 'errorTheme'));
        throw [];
      }
    }
  };
}

export function deleteAccount(ids) {
  return async dispatch => {
    try {
      await Promise.all(
        ids.map(id => AccountsApi.deleteAccount(id))
      );
      dispatch(fetchList());
    } catch (e) {
      dispatch(setFlashMessage('Cannot delete account', 'errorTheme'));
      throw e;
    }
  };
}

export function spreadBudget(data, account, type = 'account') {
  return async dispatch => {
    try {
      await AccountsApi.spreadBudget(data, account, type);
    } catch (e) {
      dispatch(setFlashMessage('Cannot spread budget', 'errorTheme'));
      throw e;
    }
  };
}

export function getBudget(account, type = 'account') {
  return async dispatch => {
    try {
      return await AccountsApi.getBudget(account, type);
    } catch (e) {
      // dispatch(setFlashMessage('Cannot get budget'));
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
        filter: initialState.filter,
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
    case UserActionTypes.SELECT_COMPANY:
      return initialState;
    default:
      return state;
  }
}
