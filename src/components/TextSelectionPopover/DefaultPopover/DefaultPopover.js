import React from 'react';

import styles from './DefaultPopover.module.less';

export const MENU_WIDTH = 225;
export const MENU_HEIGHT = 46;

export default function DefaultPopover({ left, top, show, text }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        display: show ? 'flex' : 'none',
        width: MENU_WIDTH,
        height: MENU_HEIGHT,
      }}
      className={styles.popover}
    >
      <div>Popover</div>
      <div className={styles.arrow} />
    </div>
  );
}
