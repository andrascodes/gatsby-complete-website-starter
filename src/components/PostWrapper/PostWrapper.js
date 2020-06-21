import React from 'react';

import styles from './PostWrapper.module.less';

export default function PostWrapper({ children }) {
  return <section className={styles.postWrapper}>{children}</section>;
}
