import { graphql, useStaticQuery } from 'gatsby';

export const query = graphql`
  query SiteMetadata {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

/**
 * Get the site metadata
 */
export default function useSiteMetadata() {
  /** @type {GatsbyTypes.SiteMetadataQuery} */
  const { site } = useStaticQuery(query);
  return site.siteMetadata;
}
