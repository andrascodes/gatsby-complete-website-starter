import { useStaticQuery, graphql } from 'gatsby';

export const query = graphql`
  fragment SEOConfigValues on MarkdownRemarkFrontmatter {
    socialAccounts {
      type
      url
      accountHandle
    }
    sharingButtons
  }

  query SEOConfig {
    markdownRemark(frontmatter: { identifier: { eq: "seo" } }) {
      frontmatter {
        ...SEOConfigValues
      }
    }
  }
`;

export default function useSEOConfig() {
  /** @type {GatsbyTypes.SEOConfigQuery} */
  const data = useStaticQuery(query);

  return data.markdownRemark.frontmatter;
}
