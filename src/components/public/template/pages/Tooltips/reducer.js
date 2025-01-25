export const tooltipReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_TOOLTIP":
      return {
        ...state,
        tooltipOpened: true
      };
    case "CLOSE_TOOLTIP":
      return {
        ...state,
        tooltipOpened: false
      };
    case "OPEN_POPOVER":
      return {
        ...state,
        togglePopover: true,
        popoverSibling: action.setSibling
      };
    case "CLOSE_POPOVER":
      return {
        ...state,
        togglePopover: false,
        popoverSibling: null
      };
    case "OPEN_HOVER_POPOVER":
      return {
        ...state,
        toggleHoverPopover: true,
        hoverPopoverSibling: action.setHoverPopoverSibling
      };
    case "CLOSE_HOVER_POPOVER":
      return {
        ...state,
        toggleHoverPopover: false,
        hoverPopoverSibling: null
      };
    case "OPEN_TOP_TOOLTIP":
      return {
        ...state,
        toggleTopTooltip: true
      };
    case "CLOSE_TOP_TOOLTIP":
      return {
        ...state,
        toggleTopTooltip: false
      };
    case "OPEN_RIGHT_TOOLTIP":
      return {
        ...state,
        toggleRightTooltip: true
      };
    case "CLOSE_RIGHT_TOOLTIP":
      return {
        ...state,
        toggleRightTooltip: false
      };
    case "OPEN_BOTTOM_TOOLTIP":
      return {
        ...state,
        toggleBottomTooltip: true
      };
    case "CLOSE_BOTTOM_TOOLTIP":
      return {
        ...state,
        toggleBottomTooltip: false
      };
    case "OPEN_LEFT_TOOLTIP":
      return {
        ...state,
        toggleLeftTooltip: true
      };
    case "CLOSE_LEFT_TOOLTIP":
      return {
        ...state,
        toggleLeftTooltip: false
      };
    case "OPEN_TOP_POPOVER":
      return {
        ...state,
        toggleTopPopover: true,
        topPopoverSibling: action.setTopPopoverSibling
      };
    case "CLOSE_TOP_POPOVER":
      return {
        ...state,
        toggleTopPopover: false,
        topPopoverSibling: null
      };
    case "OPEN_RIGHT_POPOVER":
      return {
        ...state,
        toggleRightPopover: true,
        rightPopoverSibling: action.setRightPopoverSibling
      };
    case "CLOSE_RIGHT_POPOVER":
      return {
        ...state,
        toggleRightPopover: false,
        rightPopoverSibling: null
      };
    case "OPEN_BOTTOM_POPOVER":
      return {
        ...state,
        toggleBottomPopover: true,
        bottomPopoverSibling: action.setBottomPopoverSibling
      };
    case "CLOSE_BOTTOM_POPOVER":
      return {
        ...state,
        toggleBottomPopover: false,
        bottomPopoverSibling: null
      };
    case "OPEN_LEFT_POPOVER":
      return {
        ...state,
        toggleLeftPopover: true,
        leftPopoverSibling: action.setLeftPopoverSibling
      };
    case "CLOSE_LEFT_POPOVER":
      return {
        ...state,
        toggleLeftPopover: false,
        leftPopoverSibling: null
      };
    default:
      return {};
  }
};