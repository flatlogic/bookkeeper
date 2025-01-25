import * as DictionariesApi from '../api/dictionaries';

/**
 * Initial State
 */
const initialState = {
  users: [],
  roles: [],
  companies: [],
  organizations: [],
};

/**
 * Action types
 */
const prefix = 'dictionaries';
export const ActionTypes = {
  FETCH_DICTIONARY_SUCCESS: `${prefix}/FETCH_LIST_SUCCESS`,
};

/**
 * Actions
 */
export function fetchDictionary(name) {
  return async dispatch => {
    try {
      const data = await DictionariesApi.fetchItem(name);
      dispatch({
        type: ActionTypes.FETCH_DICTIONARY_SUCCESS,
        payload: {
          data,
          name,
        },
      });
    } catch (e) {}
  };
}

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_DICTIONARY_SUCCESS:
      return {
        ...state,
        [action.payload.name]: action.payload.data,
      };
    default:
      return state;
  }
}
