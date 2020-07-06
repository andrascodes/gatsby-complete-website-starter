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
    site {
      siteMetadata {
        ...Metadata
        ...SocialSharingConfig
      }
    }
  }
`;

/**
 * @param {object} props
 * @prop {Location} props.location
 * @prop {GatsbyTypes.PostQuery} props.data
 */
export default function Post({ location, data: { post, site } }) {
  const {
    htmlAst,
    fields: { dateModified },
  } = post;

  const { siteMetadata } = site;

  return (
    <PostTemplate
      post={post}
      siteMetadata={siteMetadata}
      body={renderAst(htmlAst)}
    />
  );
}

/**
 * @param {object} props
 * @prop {GatsbyTypes.BlogPostFragment} props.post
 * @prop {GatsbyTypes.SiteSiteMetadata} props.siteMetadata
 * @prop {string} props.postLink
 * @prop {object} props.body
 */
export function PostTemplate({ post, siteMetadata, body }) {
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
    },
  } = post;

  /**
   * TODO:
   * - Add sharing buttons on top and bottom of post
   * - Add proper Table of Contents that follows the scroll and shows progress
   * - Add Author information section
   */
  return (
    <PostContext.Provider value={{ post, siteMetadata }}>
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
