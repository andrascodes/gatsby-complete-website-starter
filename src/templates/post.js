import React from 'react';
import { graphql } from 'gatsby';
import rehypeReact from 'rehype-react';
import dayjs from 'dayjs';

import Layout from 'components/Layout';
import RichImageWrapper from 'components/RichImageWrapper';
import Divider from 'components/Divider';
import Blockquote from 'components/Blockquote';
import Pullquote from 'components/Pullquote';
import PostSection from 'components/PostSection';
import concatURL from 'utils';
import { PostContext } from 'shared/contexts';

import useSiteMetadata from 'hooks/useSiteMetadata';
import useSEOConfig from 'hooks/useSEOConfig';
import ShareButton from 'components/ShareButton';

// @ts-ignore
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'rich-image': RichImageWrapper,
    divider: Divider,
    blockquote: Blockquote,
    pullquote: Pullquote,
  },
}).Compiler;

export const pageQuery = graphql`
  fragment PostAuthor on MarkdownRemark {
    id
    frontmatter {
      name
      email
      # avatar {
      #   image {
      #     ...AvatarImageGreyscale
      #   }
      #   alt
      #   caption
      # }
    }
  }

  fragment BlogPost on MarkdownRemark {
    frontmatter {
      title
      subtitle
      author {
        ...PostAuthor
      }
      date
      featuredImage {
        image {
          childImageSharp {
            resize(
              # Center crop
              fit: CONTAIN
              cropFocus: CENTER
              width: 1200
              height: 630
              # Fill the square with white
              background: "white"
            ) {
              src
              width
              height
            }
          }
          extension
          publicURL
        }
        alt
        caption
      }
      description
      hashtags {
        hashtag
      }
    }
    timeToRead
    tableOfContents(absolute: false)
    htmlAst
    fields {
      path
      dateModified
    }
  }

  query Post($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...BlogPost
    }
  }
`;

/**
 * @param {object} props
 * @prop {Location} props.location
 * @prop {GatsbyTypes.PostQuery} props.data
 */
export default function Post({ location, data: { post } }) {
  const {
    htmlAst,
    fields: { dateModified },
  } = post;
  const seoConfig = useSEOConfig();
  const { siteUrl } = useSiteMetadata();

  const postLink = concatURL(siteUrl, location.pathname);

  return (
    <PostTemplate
      post={post}
      seoConfig={seoConfig}
      postLink={postLink}
      body={renderAst(htmlAst)}
    />
  );
}

/**
 * @param {object} props
 * @prop {GatsbyTypes.BlogPostFragment} props.post
 * @prop {GatsbyTypes.SEOConfigValuesFragment} props.seoConfig
 * @prop {string} props.postLink
 * @prop {object} props.body
 */
export function PostTemplate({ post, seoConfig, postLink, body }) {
  const {
    timeToRead,
    tableOfContents,
    frontmatter: {
      title,
      subtitle,
      date,
      author: {
        frontmatter: {
          name: authorName,
          // email, avatar
        },
      },
      description,
      hashtags,
    },
  } = post;

  const { sharingButtons, socialAccounts } = seoConfig;

  /** @type {ShareButton.Props[]} */
  const shareButtonProps = Array.isArray(sharingButtons)
    ? sharingButtons.map(name => ({
        socialType: name,
        accounts:
          Array.isArray(socialAccounts) &&
          socialAccounts
            .filter(({ type }) => type === name)
            .map(({ accountHandle }) => accountHandle),
        postLink,
        title,
        description,
        hashtags: Array.isArray(hashtags)
          ? hashtags.map(({ hashtag }) => hashtag)
          : undefined,
      }))
    : [];

  /**
   * TODO:
   * - Add sharing buttons on top and bottom of post
   * - Add proper Table of Contents that follows the scroll and shows progress
   * - Add Author information section
   */
  return (
    <PostContext.Provider value={{ shareButtonProps }}>
      <Layout>
        <article>
          <header>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <div>
              <p>By {authorName}</p>
              <p>
                <time dateTime={dayjs(date).format('YYYY-MM-DD')}>
                  {dayjs(date).format('MMMM DD, YYYY')}
                </time>{' '}
                &middot; {timeToRead} min read
              </p>
              <div style={{ display: 'flex' }}>
                {shareButtonProps.map(props => (
                  <ShareButton {...props} />
                ))}
              </div>
            </div>
          </header>
          {tableOfContents && (
            <section>
              <h2>Contents</h2>
              <div
                dangerouslySetInnerHTML={{ __html: tableOfContents }}
                className="toc"
              />
            </section>
          )}
          <PostSection body={body} />
        </article>
      </Layout>
    </PostContext.Provider>
  );
}
