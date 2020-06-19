import React from 'react';
import { BackTop } from 'antd';

import styles from './Layout.module.less';

export default function Layout({ children }) {
  return (
    <div className={styles.root}>
      <BackTop />
      {children}
    </div>
  );
}
