import React, { useReducer, useEffect, useCallback, } from "react";
import Portal from "@reach/portal";
import { Transition } from "react-transition-group";
import tinykeys from "tinykeys";
import cn from "classnames";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import Option from "./Option";
import reducer, { initialState } from "./reducer";
import styles from "./cmdk.module.css";

function CmdK({ open, placeholder, options = [], keybind = "$mod+KeyK" }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isOpen: open,
    filtered: options,
    options
  });

  const { isOpen, query, focused, filtered } = state;

  const onChange = evt => {
    dispatch({
      type: "filter",
      query: evt.target.value
    });
  };

  const optionsRef = useCallback(node => {
    if (node) {
      disableBodyScroll(node);
    }
  }, []);

  useEffect(() => {
    if (isOpen === false) {
      clearAllBodyScrollLocks()
    }
  }, [isOpen])

  const shortcuts:any = {};
  options.forEach(option => {
    const { callback, shortcut }: { callback: any, shortcut: any } = option;
    shortcuts[shortcut] = useCallback(evt => {
      if (typeof callback === 'function') {
        callback(option, evt)
      }
    }, [option]);
  });

  useEffect(
    () => {
      const unsubscribe = tinykeys(window, {
        ...shortcuts,
        Escape: () => {
          dispatch({ type: "close" });
        },
        [keybind]: evt => {
          evt.preventDefault();
          dispatch({ type: "open" });
        }
      });

      return unsubscribe
    },
    [dispatch, shortcuts, keybind]
  );

  const onNavigateByKey = useCallback(
    evt => {
      switch (evt.key) {
        case "ArrowDown":
          evt.preventDefault();
          dispatch({ type: "down" });
          break;

        case "ArrowUp":
          evt.preventDefault();
          dispatch({ type: "up" });
          break;

        case "Enter":
          evt.preventDefault();
          dispatch({ type: "go" });
          break;
      }
    },
    [dispatch]
  );

  const onFocus = option => dispatch({ type: "focus", option });

  const onExitClick = useCallback(() => dispatch({ type: "close" }), [])

  return (
    <Transition in={isOpen} unmountOnExit timeout={200}>
      {transition => (
        <Portal>
          <div
            className={cn(styles.overlay, {
              [styles.onExiting]: transition === "exiting"
            })}
            onClick={onExitClick}
          >
            <div className={styles.center}>
              <div
                className={cn(styles.cmd, {
                  [styles.onExiting]: transition === "exiting"
                })}
                onClick={evt => evt.stopPropagation()}
              >
                <input
                  className={styles.input}
                  type="text"
                  autoFocus
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  placeholder={placeholder}
                  onChange={onChange}
                  value={query}
                  onKeyDown={onNavigateByKey}
                />
                <ul
                  className={styles.options}
                  ref={optionsRef}
                >
                  {filtered
                    .filter(({ name }) =>
                      name.toLowerCase().includes(query.toLowerCase())
                    )
                    .map(option => (
                      <Option
                        key={option.name}
                        focused={option === focused}
                        onFocus={onFocus}
                        dispatch={dispatch}
                        option={option}
                      />
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </Transition>
  );
}

export default CmdK;
