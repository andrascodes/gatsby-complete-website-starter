import React from 'react';
import { graphql } from 'gatsby';
import Header from '../components/Header';

export const pageQuery = graphql`
  fragment BlogPost on MarkdownRemark {
    html
    frontmatter {
      title
      date
      subtitle
    }
  }

  query Post($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...BlogPost
      excerpt(pruneLength: 160)
      frontmatter {
        description
      }
      fields {
        path
        dateModified
      }
    }
  }
`;

export default function Post({ data: { post } }) {
  const {
    frontmatter: { title, subtitle },
    fields: { dateModified },
  } = post;

  console.log(post);
  return (
    <div>
      <Header title={title} />
      <p>{subtitle}</p>
      <p>{dateModified}</p>
    </div>
  );
}
