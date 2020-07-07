import React, { useContext } from 'react';

import { PostContext } from 'shared/contexts';
import { SOCIAL_MEDIA_ACCOUNT_TYPES } from 'shared/constants';
import ShareButton from 'components/ShareButton';

import styles from './SharingPopover.module.less';
import concatURL from 'utils';

export const POPOVER_WIDTH = 232;
export const POPOVER_HEIGHT = 46;
const ALLOWED_SOCIAL_SHARING = [
  SOCIAL_MEDIA_ACCOUNT_TYPES.FACEBOOK,
  SOCIAL_MEDIA_ACCOUNT_TYPES.TWITTER,
  SOCIAL_MEDIA_ACCOUNT_TYPES.LINKEDIN,
];

/**
 * @param {object} props
 * @prop {number} props.left
 * @prop {number} props.top
 * @prop {Boolean} props.show
 * @prop {string} props.text
 * @prop {() => any} props.onCopyButtonClick
 */
export default function SharingPopover({
  left,
  top,
  show,
  text,
  onCopyButtonClick,
}) {
  const { shareButtonProps } = useContext(PostContext);

  const popoverShareButtonProps = shareButtonProps
    .filter(({ socialType }) => ALLOWED_SOCIAL_SHARING.includes(socialType))
    .map(props => ({
      ...props,
      type: 'popover',
      text,
    }));

  return (
    <div
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        display: show ? 'flex' : 'none',
        width: POPOVER_WIDTH,
        height: POPOVER_HEIGHT,
      }}
      className={styles.popover}
    >
      <div className={styles.actionsContainer}>
        <div className={styles.shareLinks}>
          <span className={styles.shareLabel}>Share:</span>
          <div className={styles.shareButtonsContainer}>
            {popoverShareButtonProps.map((props, index) => (
              <ShareButton key={`sharePopoverButton-${index}`} {...props} />
            ))}
          </div>
        </div>
        <div className={styles.copyButtonContainer}>
          <ShareButton
            type="popover"
            socialType="copy"
            onClick={onCopyButtonClick}
          />
        </div>
      </div>
      <div className={styles.arrow} />
    </div>
  );
}
