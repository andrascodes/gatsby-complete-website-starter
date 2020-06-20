import React from 'react';
import classNames from 'classnames';

import styles from './RichImageWrapper.module.less';

export const RICH_IMAGE_POSITIONS = {
  FLOAT_LEFT: {
    label: 'Float Left',
    value: 'float-left',
  },
  FLOAT_RIGHT: {
    label: 'Float Right',
    value: 'float-right',
  },
  TOP_BOTTOM: {
    label: 'Top-Bottom',
    value: 'top-bottom',
  },
  WIDE: {
    label: 'Wide',
    value: 'wide',
  },
};

const positionStyleMap = {
  [RICH_IMAGE_POSITIONS.FLOAT_RIGHT.value]: styles.floatRight,
  [RICH_IMAGE_POSITIONS.FLOAT_LEFT.value]: styles.floatLeft,
  [RICH_IMAGE_POSITIONS.WIDE.value]: styles.wide,
};

export default function RichImageWrapper({ children, position }) {
  return (
    <figure
      className={classNames(styles.richImage, positionStyleMap[position])}
    >
      {children}
    </figure>
  );
}
