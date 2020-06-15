import React from 'react';
import { graphql } from 'gatsby';

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
      date(formatString: "MMMM DD, YYYY")
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

export default function Post({ data: { post } }) {
  const {
    htmlAst,
    fields: { dateModified },
  } = post;

  return (
    <PostTemplate
      {...post}
      // body={renderAst(htmlAst)}
      body={'Post content'}
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
  } = props;

  return (
    <article>
      <header>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div>
          <p>By {authorName}</p>
          <p>
            {date} &middot; {timeToRead} min read
          </p>
        </div>
      </header>
      <section>
        <h2>Contents</h2>
        <div
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
          className="toc"
        />
      </section>
      <section>{body}</section>
    </article>
  );
}
