import React, { useRef, useEffect, useState } from 'react';

import TextSelectionPopover, {
  DEFAULT_MENU_WIDTH,
  DEFAULT_MENU_HEIGHT,
} from 'components/TextSelectionPopover';

import styles from './PostSection.module.less';

export default function PostSection({ body }) {
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
      />
    </section>
  );
}
