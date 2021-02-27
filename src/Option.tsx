import React, { useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';

import styles from './option.module.css';

function Option({ focused, onFocus, dispatch, option }) {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (focused && ref.current) {
      ref.current.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [focused]);

  const { name, shortcut, subtitle, icon: Icon } = option;
  const onClick = useCallback(() => {
    dispatch({ type: 'go' });
  }, [dispatch]);

  const onHover = () => onFocus(option);

  return (
    <li
      ref={ref}
      className={cn(styles.option, { [styles.focused]: focused })}
      onMouseOver={onHover}
      onClick={onClick}
    >
      <div className={styles.title}>
        {Icon && <Icon />}
        <div>{name}</div>
      </div>
      <div className={styles.keybind}>
        <small>{subtitle}</small>
        {shortcut && shortcut.split(' ').map(key => <kbd key={key}>{key}</kbd>)}
      </div>
    </li>
  );
}

export default Option;
