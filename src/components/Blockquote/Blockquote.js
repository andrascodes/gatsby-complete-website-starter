import React from 'react';

import styles from './Blockquote.module.less';

export default function Blockquote({ quote, children }) {
  if (quote) {
    return (
      <blockquote
        className={styles.blockquote}
        dangerouslySetInnerHTML={{
          __html: quote,
        }}
      />
    );
  }
  return <blockquote className={styles.blockquote}>{children}</blockquote>;
}
