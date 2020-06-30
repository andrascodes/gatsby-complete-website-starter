import React from 'react';
import { Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import styles from './DefaultPopover.module.less';

export const MENU_WIDTH = 225;
export const MENU_HEIGHT = 46;

export default function DefaultPopover({ left, top, show, onCopyButtonClick }) {
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
      <div className={styles.actionsContainer}>
        <div className={styles.shareLinks}>Popover</div>
        <div className={styles.copyLink}>
          <Button
            className={styles.copyButton}
            type="link"
            icon={<CopyOutlined />}
            onClick={onCopyButtonClick}
          />
        </div>
      </div>
      <div className={styles.arrow} />
    </div>
  );
}
