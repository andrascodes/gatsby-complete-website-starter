import React from 'react';

/**
 * @type {{ post: GatsbyTypes.BlogPostFragment, siteMetadata: GatsbyTypes.SiteSiteMetadata }}
 */
const defaultPostState = {
  post: undefined,
  siteMetadata: undefined,
};
export const PostContext = React.createContext(defaultPostState);
