import siteMetadata from './siteMetadata';

/**
 * @type {import("netlify-cms-core").CmsCollection}
 */
const metadata = {
  name: 'config',
  label: 'Config',
  editor: {
    preview: false,
  },
  files: [siteMetadata],
};
export default metadata;
