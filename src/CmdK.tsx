import React, { useState, useReducer, useEffect, useCallback } from 'react';
import Portal from '@reach/portal';
import { Transition } from 'react-transition-group';
import tinykeys from 'tinykeys';
import cn from 'classnames';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import debounce from 'lodash/debounce'

import Option from './Option';
import Loading from './Loading';
import reducer, { initialState } from './reducer';
import styles from './cmdk.module.css';



function CmdK({
  open,
  placeholder,
  getOptions,
  keybind = '$mod+KeyK',
  children,
}) {
  const [ isLoading, setIsLoading ] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isOpen: open,
  });

  const { isOpen, query, focused, options, } = state;

  const _getOptions = useCallback(debounce((query: string): void => {
    setIsLoading(true)
    getOptions(query).then(options => {
      dispatch({
        type: 'update',
        options,
      })
      setIsLoading(false)
    })
  }, 200, { leading: true }), [])

  const onChange = (evt) => dispatch({ type: 'filter', query: evt.target.value })

  useEffect(() => {
    _getOptions(query)
  }, [query, _getOptions])

  /*
  const shortcuts: any = {};
  options.forEach(option => {
    const { callback, shortcut }: { callback: any; shortcut: any } = option;
    if (shortcut && callback) {
      shortcuts[shortcut] = useCallback(
        evt => {
          callback(option, evt);
        },
        [option]
      );
    }
  });
  */


  const optionsRef = useCallback(node => {
    if (node) {
      disableBodyScroll(node);
    }
  }, []);

  useEffect(() => {
    if (isOpen === false) {
      clearAllBodyScrollLocks();
    }
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      Escape: () => {
        dispatch({ type: 'close' });
      },
      [keybind]: evt => {
        evt.preventDefault();
        dispatch({ type: 'open' });
      },
    });

    return unsubscribe;
  }, [dispatch, keybind]);

  const onNavigateByKey = useCallback(
    evt => {
      switch (evt.key) {
        case 'ArrowDown':
          evt.preventDefault();
          dispatch({ type: 'down' });
          break;

        case 'ArrowUp':
          evt.preventDefault();
          dispatch({ type: 'up' });
          break;

        case 'Enter':
          evt.preventDefault();
          dispatch({ type: 'go' });
          break;
      }
    },
    [dispatch]
  );

  const onFocus = useCallback(option => dispatch({ type: 'focus', option }), [])
  const onExitClick = useCallback(() => dispatch({ type: 'close' }), []);

  return (
    <>
      <Transition in={isOpen} unmountOnExit timeout={200}>
        {transition => (
          <Portal>
            <div
              className={cn(styles.overlay, {
                [styles.onExiting]: transition === 'exiting',
              })}
              onClick={onExitClick}
            >
              <div className={styles.center}>
                <div
                  className={cn(styles.cmd, {
                    [styles.onExiting]: transition === 'exiting',
                  })}
                  onClick={evt => evt.stopPropagation()}
                >
                  <div className={styles.input}>
                    <input
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
                    {isLoading && <Loading />}
                  </div>
                  <ul className={styles.options} ref={optionsRef}>
                    {options.map(option => (
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
      {children && children({ dispatch })}
    </>
  );
}

export default CmdK;
