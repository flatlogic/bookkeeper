/**
 * Initial State
 */
const initialState = {
  flashMessage: {
    message: '',
    type: '',
  },
};

/**
 * Action types
 */
const prefix = 'app';
export const ActionTypes = {
  SET_FLASH_MESSAGE: `${prefix}/SET_FLASH_MESSAGE`,
  RESET_FLASH_MESSAGE: `${prefix}/SET_FLASH_MESSAGE`,
};

/**
 * Actions
 */
let closeTimer = null;

export function setFlashMessage(message, type = 'error') {
  return async dispatch => {
    dispatch({
      type: ActionTypes.SET_FLASH_MESSAGE,
      payload: {
        message,
        type,
      },
    });

    closeTimer = setTimeout(() => {
      dispatch({
        type: ActionTypes.SET_FLASH_MESSAGE,
        message: {},
      });
    }, 5000)
  };
}

export function resetFlashMessage() {
  return async dispatch => {
    closeTimer && clearTimeout(closeTimer);
    dispatch({
      type: ActionTypes.RESET_FLASH_MESSAGE,
    });
  };
}

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_FLASH_MESSAGE:
      return { ...state, flashMessage: {...action.payload} };
    case ActionTypes.RESET_FLASH_MESSAGE:
      return { ...state, flashMessage: {} };
    default:
      return state;
  }
}
