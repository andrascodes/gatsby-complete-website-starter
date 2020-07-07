import React from 'react';
import classNames from 'classnames';

import { Button } from 'antd';
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  CopyOutlined,
  RedditOutlined,
} from '@ant-design/icons';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
} from 'react-share';

import styles from './Buttons.module.less';

export const SHARE_BUTTON_POPOVER_TYPE = 'popover';

const getClassName = type =>
  classNames({
    [styles.popoverButton]: type === SHARE_BUTTON_POPOVER_TYPE,
    [styles.defaultButton]: type !== SHARE_BUTTON_POPOVER_TYPE,
  });

export const Facebook = ({ type, postLink, text, hashtags }) => (
  <FacebookShareButton
    className={styles.shareButton}
    url={postLink}
    quote={text}
    hashtag={hashtags && `#${hashtags[0]}`}
  >
    <FacebookFilled className={getClassName(type)} />
  </FacebookShareButton>
);

export const Twitter = ({ type, postLink, text, hashtags, accounts }) => (
  <TwitterShareButton
    className={styles.shareButton}
    url={postLink}
    title={text}
    hashtags={hashtags}
    via={accounts && accounts[0]}
    related={accounts}
  >
    <TwitterOutlined className={getClassName(type)} />
  </TwitterShareButton>
);

export const LinkedIn = ({ type, postLink, text }) => (
  <LinkedinShareButton
    className={styles.shareButton}
    url={postLink}
    summary={text}
  >
    <LinkedinFilled className={getClassName(type)} />
  </LinkedinShareButton>
);

export const Copy = ({ type, onClick }) => (
  <Button
    className={styles.shareButton}
    type="link"
    icon={<CopyOutlined className={getClassName(type)} />}
    onClick={onClick}
  />
);

export const Reddit = ({ title, postLink, type }) => (
  <RedditShareButton
    className={styles.shareButton}
    url={postLink}
    title={title}
  >
    <RedditOutlined className={getClassName(type)} />
  </RedditShareButton>
);
