import { SOCIAL_MEDIA_ACCOUNT_TYPES } from 'shared/constants';

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
    {
      widget: 'list',
      name: 'social',
      label: 'Social Media Accounts',
      required: false,
      hint: 'List of Social Media accounts',
      fields: [
        {
          name: 'type',
          label: 'Social Media site',
          widget: 'select',
          options: Object.values(SOCIAL_MEDIA_ACCOUNT_TYPES),
          required: true,
        },
        {
          widget: 'string',
          name: 'url',
          label: 'URL',
          required: true,
          hint: 'The URL of the social media site',
        },
        {
          widget: 'string',
          name: 'accountHandle',
          label: 'Account Handle',
          required: false,
          hint: `The account handle, for example: "garyvee"`,
        },
      ],
    },
    {
      name: 'sharingButtons',
      label: 'Social Media sharing buttons',
      widget: 'select',
      options: Object.keys(SOCIAL_MEDIA_ACCOUNT_TYPES)
        .map(key => ({ label: SOCIAL_MEDIA_ACCOUNT_TYPES[key], value: key }))
        .filter(({ label }) => label !== SOCIAL_MEDIA_ACCOUNT_TYPES.INSTAGRAM),
      required: true,
      multiple: true,
      hint: 'Which social media sharing buttons to show on the blog posts',
    },
  ],
};
