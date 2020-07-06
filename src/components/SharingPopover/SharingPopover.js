import React, { useContext } from 'react';

import { PostContext } from 'shared/contexts';
import ShareButton from 'components/ShareButton';

import styles from './SharingPopover.module.less';
import concatURL from 'utils';

export const POPOVER_WIDTH = 232;
export const POPOVER_HEIGHT = 46;

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
  const { post, siteMetadata } = useContext(PostContext);

  const { siteUrl, sharingButtons, socialAccounts } = siteMetadata;
  const { description, hashtags, featuredImage } = post.frontmatter;
  const featuredImageSrc = featuredImage.image.childImageSharp.resize.src;

  const postLink = concatURL(siteUrl, location.pathname);
  const media = concatURL(siteUrl, featuredImageSrc);

  const sharingButtonProps = sharingButtons.map(name => ({
    type: name,
    accounts: socialAccounts
      .filter(({ type }) => type === name)
      .map(({ accountHandle }) => accountHandle),
    postLink,
    text,
    description,
    hashtags: Array.isArray(hashtags)
      ? hashtags.map(({ hashtag }) => hashtag)
      : [],
    media,
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
          {sharingButtonProps.map(props => (
            <ShareButton {...props} />
          ))}
        </div>
        <div className={styles.copyButtonContainer}>
          <ShareButton type="copy" onClick={onCopyButtonClick} />
        </div>
      </div>
      <div className={styles.arrow} />
    </div>
  );
}
