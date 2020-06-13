import React from 'react';
import { graphql, Link } from 'gatsby';
import rehypeReact from 'rehype-react';

import * as MDXComponents from 'components/MDXComponents';
import TableOfContents from 'components/TableOfContents';

// @ts-ignore
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    // Only Replace custom Editor Components where we control the preview
    // Everything else has to be styled from a Wrapper component
    figcaption: ({ children }) => (
      <figcaption>
        <h2>{children}</h2>
      </figcaption>
    ),
    tooltip: ({ children, number }) => <span>{number}</span>,
  },
}).Compiler;

export const pageQuery = graphql`
  fragment BlogPost on MarkdownRemark {
    htmlAst
    timeToRead
    tableOfContents(absolute: false)
    frontmatter {
      title
      subtitle
      description
      author
      date(formatString: "MMMM DD, YYYY")
      tags
    }
  }

  query Post($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...BlogPost
      excerpt(pruneLength: 160)
      fields {
        path
        dateModified
      }
    }
  }
`;

export function PostTemplate(props) {
  const {
    title,
    subtitle,
    author,
    date,
    timeToRead,
    tableOfContents,
    dateModified,
    body,
  } = props;

  return (
    <div>
      <header>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div>
          <p>By {author}</p>
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
        {/* <TableOfContents headings={tableOfContentsItems} /> */}
      </section>
      {dateModified && <p>{new Date(dateModified).toISOString()}</p>}
      {body}
    </div>
  );
}

export default function Post(props) {
  const {
    data: {
      post: {
        fields: { dateModified },
        frontmatter: { title, subtitle, author, description, date, tags },
        htmlAst,
        timeToRead,
        tableOfContents,
      },
    },
  } = props;

  return (
    <>
      <PostTemplate
        title={title}
        subtitle={subtitle}
        author={author}
        date={date}
        timeToRead={timeToRead}
        tableOfContents={tableOfContents}
        dateModified={dateModified}
        body={renderAst(htmlAst)}
      />
    </>
  );
}
