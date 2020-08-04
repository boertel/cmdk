export const initialState = {
  activeIndex: 0,
  focused: null,
  query: '',
}

function reducer(state, action) {
  let activeIndex;
  switch (action.type) {
    case "close":
      if (state.isOpen === false) {
        return state;
      }
      if (state.query.length > 0) {
        return {
          ...state,
          ...initialState,
          filtered: state.options
        }
      }
      return {
        ...state,
        ...initialState,
        filtered: state.options,
        isOpen: false
      };

    case "open":
      if (state.isOpen === true) {
        return state;
      }
      return {
        ...state,
        isOpen: true
      };

    case "up":
      activeIndex =
        state.activeIndex > 0 ? state.activeIndex - 1 : state.activeIndex;
      return {
        ...state,
        activeIndex,
        focused: state.filtered[activeIndex]
      };

    case "down":
      activeIndex =
        state.activeIndex < state.filtered.length - 1
          ? state.activeIndex + 1
          : state.activeIndex;
      return {
        ...state,
        activeIndex,
        focused: state.filtered[activeIndex]
      };

    case "filter":
      const filtered = state.options.filter(({ name }) =>
        name.toLowerCase().includes(action.query.toLowerCase())
      );
      let focused = state.focused
      activeIndex = filtered.indexOf(focused)
      if (!filtered.includes(state.focused)) {
        focused = filtered[0]
        activeIndex = 0
      }
      return {
        ...state,
        query: action.query,
        focused,
        activeIndex,
        filtered
      };

    case "focus":
      activeIndex = state.filtered.indexOf(action.option)
      return {
        ...state,
        focused: action.option,
        activeIndex,
      }

    case "go":
      let selected = state.filtered[0];
      if (state.focused) {
        selected = state.focused;
      }
      if (selected.callback) {
        return {
          ...state,
          filtered: state.options,
          ...(selected.callback(selected) || {})
        }
      }
      return state;

    default:
      throw new Error("Invalid action for CmdK reducer");
  }
}

export default reducer
