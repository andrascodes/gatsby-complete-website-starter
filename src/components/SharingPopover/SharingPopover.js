import React from 'react';
import { Button } from 'antd';
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  CopyOutlined,
} from '@ant-design/icons';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

import styles from './SharingPopover.module.less';

export const POPOVER_WIDTH = 232;
export const POPOVER_HEIGHT = 46;

export default function SharingPopover({
  left,
  top,
  show,
  text,
  onCopyButtonClick,
  postLink,
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        display: show ? 'flex' : 'none',
        width: POPOVER_WIDTH,
        height: POPOVER_HEIGHT,
      }}
      className={styles.popover}
    >
      <div className={styles.actionsContainer}>
        <div className={styles.shareLinks}>
          <span className={styles.shareLabel}>Share:</span>
          <FacebookShareButton url={postLink} quote={text}>
            <Button
              className={styles.popoverButton}
              type="link"
              icon={<FacebookFilled />}
            />
          </FacebookShareButton>
          <TwitterShareButton url={postLink} title={text}>
            <Button
              className={styles.popoverButton}
              type="link"
              icon={<TwitterOutlined />}
            />
          </TwitterShareButton>
          {/* LinkedIn sharing doesn't work unless the URL exists */}
          <LinkedinShareButton url={postLink}>
            <Button
              className={styles.popoverButton}
              type="link"
              icon={<LinkedinFilled />}
            />
          </LinkedinShareButton>
        </div>
        <div className={styles.copyButtonContainer}>
          <Button
            className={styles.popoverButton}
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
