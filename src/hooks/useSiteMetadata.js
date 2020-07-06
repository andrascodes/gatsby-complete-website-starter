import { graphql, useStaticQuery } from 'gatsby';

export const query = graphql`
  fragment Metadata on SiteSiteMetadata {
    siteUrl
  }

  fragment SocialSharingConfig on SiteSiteMetadata {
    sharingButtons
    socialAccounts {
      type
      url
      accountHandle
    }
  }

  query SiteMetadata {
    site {
      siteMetadata {
        ...Metadata
        ...SocialSharingConfig
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
