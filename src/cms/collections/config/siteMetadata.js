/** @type {import("netlify-cms-core").CmsCollectionFile} */
export default {
  name: 'siteMetadata',
  label: 'Site Metadata',
  file: 'site-metadata.json',
  fields: [
    {
      widget: 'string',
      name: 'siteUrl',
      label: 'Site URL',
      required: true,
      hint: 'URL of the site',
    },
  ],
};
