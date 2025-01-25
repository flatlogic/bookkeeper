import * as OrganizationsApi from '../../api/admin/organizations';
import { setFlashMessage } from '../app';
import { selectFilter, selectSorting } from '../../selectors/admin/organizations';

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
const prefix = 'organizations';
export const ActionTypes = {
  FETCH_ORGS: `${prefix}/FETCH_ORGS`,
  FETCH_ORGS_SUCCESS: `${prefix}/FETCH_ORGS_SUCCESS`,
  FETCH_ORG_ITEM: `${prefix}/FETCH_ORG_ITEM`,
  FETCH_ORG_ITEM_SUCCESS: `${prefix}/FETCH_ORG_ITEM_SUCCESS`,
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
    dispatch(fetchOrgsList());
  };
}
export function fetchOrgsList() {
  return async (dispatch, getState) => {
    const filter = selectFilter(getState());
    const sorting = selectSorting(getState());
    try {
      dispatch({
        type: ActionTypes.FETCH_ORGS,
      });
      const orgs = await OrganizationsApi.fetchOrgsList({...filter, ...sorting});
      dispatch({
        type: ActionTypes.FETCH_ORGS_SUCCESS,
        payload: orgs,
      });
    } catch (e) {
      dispatch(setFlashMessage('Cannot load organizations', 'errorTheme'));
    }
  };
}

export function fetchOrgItem(id) {
  return async dispatch => {
    try {
      dispatch({
        type: ActionTypes.FETCH_ORG_ITEM,
      });
      const orgs = await OrganizationsApi.fetchOrgItem(id);
      dispatch({
        type: ActionTypes.FETCH_ORG_ITEM_SUCCESS,
        payload: orgs,
      });
    } catch (e) {
      dispatch(setFlashMessage('Cannot load organizations', 'errorTheme'));
    }
  };
}

export function create(data) {
  return async dispatch => {
    try {
      await OrganizationsApi.create(data);
      dispatch(fetchOrgsList());
    } catch (e) {
      if (e.response.data.modelErrors) {
        throw e.response.data.modelErrors;
      } else {
        dispatch(setFlashMessage('Cannot create organization', 'errorTheme'));
      }
    }
  };
}

export function update(id, data) {
  return async dispatch => {
    try {
      await OrganizationsApi.update(id, data);
      dispatch(fetchOrgsList());
    } catch (e) {
      if (e.response.data.modelErrors) {
        throw e.response.data.modelErrors;
      } else {
        dispatch(setFlashMessage('Cannot update organization', 'errorTheme'));
      }
    }
  };
}

export function deleteOrganizations(ids) {
  return async dispatch => {
    try {
      await Promise.all(
        ids.map(id => OrganizationsApi.deleteOrganization(id))
      );
      dispatch(fetchOrgsList());
    } catch (e) {
      dispatch(setFlashMessage('Cannot delete organization', 'errorTheme'));
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
      dispatch(fetchOrgsList());
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
      dispatch(fetchOrgsList());
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
    case ActionTypes.FETCH_ORGS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };
    case ActionTypes.FETCH_ORG_ITEM_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false,
      };
    case ActionTypes.FETCH_ORGS:
    case ActionTypes.FETCH_ORG_ITEM:
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
    default:
      return state;
  }
}
