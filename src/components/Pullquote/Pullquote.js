import React from 'react';

import styles from './Pullquote.module.less';

export default function Pullquote({ quote, children }) {
  if (quote) {
    return (
      <blockquote
        className={styles.pullquote}
        dangerouslySetInnerHTML={{
          __html: quote,
        }}
      />
    );
  }
  return <blockquote className={styles.pullquote}>{children}</blockquote>;
}
