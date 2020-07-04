import { graphql, useStaticQuery } from 'gatsby';

/**
 * Get the site metadata
 */
const useSiteMetadata = () => {
  /** @type {GatsbyTypes.SiteMetadataQuery} */
  const { site } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `,
  );
  return site.siteMetadata;
};

export default useSiteMetadata;
