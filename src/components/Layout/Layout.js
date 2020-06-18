import React from 'react';

import styles from './Layout.module.less';

export default function Layout({ children }) {
  return <div className={styles.root}>{children}</div>;
}
