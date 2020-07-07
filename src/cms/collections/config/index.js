import siteMetadata from './siteMetadata';
import seoConfig from './seo';

/**
 * @type {import("netlify-cms-core").CmsCollection}
 */
const config = {
  name: 'config',
  label: 'Config',
  editor: {
    preview: false,
  },
  files: [siteMetadata, seoConfig],
};
export default config;
