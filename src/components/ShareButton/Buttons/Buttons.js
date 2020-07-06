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

import styles from './Buttons.module.less';

export const Facebook = ({ postLink, text, hashtags }) => (
  <FacebookShareButton url={postLink} quote={text} hashtag={`#${hashtags[0]}`}>
    <Button
      className={styles.popoverButton}
      type="link"
      icon={<FacebookFilled />}
    />
  </FacebookShareButton>
);

export const Twitter = ({ postLink, text, hashtags, accounts }) => (
  <TwitterShareButton
    url={postLink}
    title={text}
    hashtags={hashtags}
    via={accounts[0]}
    related={accounts}
  >
    <Button
      className={styles.popoverButton}
      type="link"
      icon={<TwitterOutlined />}
    />
  </TwitterShareButton>
);

export const LinkedIn = ({ postLink, text }) => (
  <LinkedinShareButton url={postLink} summary={text}>
    <Button
      className={styles.popoverButton}
      type="link"
      icon={<LinkedinFilled />}
    />
  </LinkedinShareButton>
);

export const Copy = ({ onClick }) => (
  <Button
    className={styles.popoverButton}
    type="link"
    icon={<CopyOutlined />}
    onClick={onClick}
  />
);
