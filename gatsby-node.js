/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateDevServer = () => {
  /**
   * Start the Netlify CMS file proxy server, which is used to turn local
   * CMS "Publish" to file saves
   */
  require('netlify-cms-proxy-server');
};
