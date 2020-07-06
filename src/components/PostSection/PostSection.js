import React, { useRef } from 'react';

import TextSelectionPopover from 'components/TextSelectionPopover';
import SharingPopover, {
  POPOVER_WIDTH,
  POPOVER_HEIGHT,
} from 'components/SharingPopover';

import styles from './PostSection.module.less';

/**
 * @param {object} props
 * @prop {object} props.body
 */
export default function PostSection({ body }) {
  const textSelectionTargetRef = useRef(null);

  return (
    <section ref={textSelectionTargetRef} className={styles.postWrapper}>
      {body}
      {
        //@ts-ignore
        !window.NETLIFY_CMS && (
          <TextSelectionPopover
            targetRef={textSelectionTargetRef}
            customPosition={({ targetElement }) => ({
              selectionArea: targetElement.querySelector('div > p'),
              xOffset: POPOVER_WIDTH,
              yOffset: POPOVER_HEIGHT,
            })}
            excludeQuery="pre, figure, img"
            renderPopover={props => <SharingPopover {...props} />}
          />
        )
      }
    </section>
  );
}
