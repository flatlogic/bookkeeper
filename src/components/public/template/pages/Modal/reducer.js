export const modalReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        toggleModal: true
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        toggleModal: false
      };
    case "OPEN_BODY":
      return {
        ...state,
        toggleBody: true
      };
    case "CLOSE_BODY":
      return {
        ...state,
        toggleBody: false
      };
    case "OPEN_SMALL":
      return {
        ...state,
        toggleSmall: true
      };
    case "CLOSE_SMALL":
      return {
        ...state,
        toggleSmall: false
      };
    case "OPEN_LARGE":
      return {
        ...state,
        toggleLarge: true
      };
    case "CLOSE_LARGE":
      return {
        ...state,
        toggleLarge: false
      };
    case "OPEN_GRID":
      return {
        ...state,
        toggleGrid: true
      };
    case "CLOSE_GRID":
      return {
        ...state,
        toggleGrid: false
      };
    case "OPEN_INPUT_MODAL":
      return {
        ...state,
        toggleInputModal: true
      };
    case "CLOSE_INPUT_MODAL":
      return {
        ...state,
        toggleInputModal: false
      };
    default:
      return null;
  }
};