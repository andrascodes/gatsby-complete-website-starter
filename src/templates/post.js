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
import useSiteMetadata from 'hooks/useSiteMetadata';
import concatURL from 'utils';

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
      date
      author {
        ...PostAuthor
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

export default function Post({ location, data: { post } }) {
  const {
    htmlAst,
    fields: { dateModified },
  } = post;

  const { siteUrl } = useSiteMetadata();

  return (
    <PostTemplate
      {...post}
      postLink={concatURL(siteUrl, location.pathname)}
      body={renderAst(htmlAst)}
    />
  );
}

export function PostTemplate(props) {
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
    body,
    postLink,
  } = props;

  return (
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
        <PostSection body={body} postLink={postLink} />
      </article>
    </Layout>
  );
}
