import React from 'react';

import styles from './DefaultPopover.module.less';

export const MENU_WIDTH = 225;
export const MENU_HEIGHT = 46;

export default function DefaultPopover({
  left,
  top,
  show,
  text,
  onCopyButtonClick,
  renderPopoverContent,
  renderCopyButton,
  menuWidth,
  menuHeight,
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        display: show ? 'flex' : 'none',
        width: menuWidth || MENU_WIDTH,
        height: menuHeight || MENU_HEIGHT,
      }}
      className={styles.popover}
    >
      <div className={styles.actionsContainer}>
        {renderPopoverContent && renderPopoverContent({ text })}
        <div className={styles.copyButtonContainer}>
          {renderCopyButton && renderCopyButton({ onCopyButtonClick })}
        </div>
      </div>
      <div className={styles.arrow} />
    </div>
  );
}
