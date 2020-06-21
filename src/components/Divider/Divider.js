import React from 'react';
import classNames from 'classnames';

import styles from './Divider.module.less';

export const DIVIDER_TYPES = {
  DOTTED: {
    label: 'Dotted',
    value: 'dotted',
  },
};

const dividerContentMap = {
  [DIVIDER_TYPES.DOTTED.value]: '...',
};

const dividerStyleMap = {
  [DIVIDER_TYPES.DOTTED.value]: styles.dotted,
};

export default function Divider({ type = DIVIDER_TYPES.DOTTED.value }) {
  return (
    <div className={classNames(styles.divider, dividerStyleMap[type])}>
      {dividerContentMap[type]}
    </div>
  );
}
