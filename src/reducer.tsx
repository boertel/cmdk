export const initialState = {
  activeIndex: 0,
  focused: null,
  query: '',
  options: [],
};

function reducer(state, action) {
  console.log(action);
  let activeIndex;
  switch (action.type) {
    case 'close':
      if (state.isOpen === false) {
        return state;
      }
      if (state.query.length > 0) {
        return {
          ...state,
          ...initialState,
        };
      }
      return {
        ...state,
        ...initialState,
        isOpen: false,
      };

    case 'open':
      if (state.isOpen === true) {
        return {
          ...state,
          isOpen: false,
        };
      }
      return {
        ...state,
        isOpen: true,
      };

    case 'filter':
      return {
        ...state,
        query: action.query,
      };

    case 'update':
      activeIndex = action.options.indexOf(state.focused);
      activeIndex = activeIndex !== -1 ? activeIndex : 0;
      return {
        ...state,
        focused: action.options[activeIndex],
        activeIndex,
        options: action.options,
      };

    case 'up':
      activeIndex =
        state.activeIndex > 0 ? state.activeIndex - 1 : state.activeIndex;
      return {
        ...state,
        focused: state.options[activeIndex],
        activeIndex,
      };

    case 'down':
      activeIndex =
        state.activeIndex < state.options.length - 1
          ? state.activeIndex + 1
          : state.activeIndex;
      return {
        ...state,
        focused: state.options[activeIndex],
        activeIndex,
      };

    case 'focus':
      return {
        ...state,
        focused: action.option,
        activeIndex: state.options.indexOf(action.option),
      };

    case 'go':
      const focused = state.focused;
      if (focused?.callback) {
        focused.callback(focused);
      }
      activeIndex = 0;
      return {
        ...state,
        query: '',
        focused: state.options[activeIndex],
        activeIndex,
        isOpen: false,
      };

    default:
      throw new Error('Invalid action for CmdK reducer');
  }
}

export default reducer;
