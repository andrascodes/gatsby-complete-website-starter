import React, { useRef } from 'react';
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

import TextSelectionPopover, {
  DEFAULT_MENU_WIDTH,
  DEFAULT_MENU_HEIGHT,
} from 'components/TextSelectionPopover';

import styles from './PostSection.module.less';

export default function PostSection({ body, absolutePath }) {
  const textSelectionTargetRef = useRef(null);

  return (
    <section ref={textSelectionTargetRef} className={styles.postWrapper}>
      {body}
      <TextSelectionPopover
        targetRef={textSelectionTargetRef}
        customPosition={({ targetElement }) => ({
          selectionArea: targetElement.querySelector('div > p'),
          xOffset: DEFAULT_MENU_WIDTH,
          yOffset: DEFAULT_MENU_HEIGHT,
        })}
        excludeQuery="pre, figure, img"
        menuWidth={232}
        renderPopoverContent={({ text }) => (
          <div className={styles.shareLinks}>
            <span className={styles.shareLabel}>Share:</span>
            <FacebookShareButton url={absolutePath} quote={text}>
              <Button
                className={styles.popoverButton}
                type="link"
                icon={<FacebookFilled />}
              />
            </FacebookShareButton>
            <TwitterShareButton url={absolutePath} title={text}>
              <Button
                className={styles.popoverButton}
                type="link"
                icon={<TwitterOutlined />}
              />
            </TwitterShareButton>
            {/* LinkedIn sharing doesn't work unless the URL exists */}
            <LinkedinShareButton url={absolutePath}>
              <Button
                className={styles.popoverButton}
                type="link"
                icon={<LinkedinFilled />}
              />
            </LinkedinShareButton>
          </div>
        )}
        renderCopyButton={({ onCopyButtonClick }) => (
          <Button
            className={styles.popoverButton}
            type="link"
            icon={<CopyOutlined />}
            onClick={onCopyButtonClick}
          />
        )}
      />
    </section>
  );
}
