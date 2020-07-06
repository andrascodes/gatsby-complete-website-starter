import { SOCIAL_MEDIA_ACCOUNT_TYPES } from 'shared/constants';

const SOCIAL_MEDIA_ACCOUNT_TYPE_OPTIONS = Object.values(
  SOCIAL_MEDIA_ACCOUNT_TYPES,
);

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
      name: 'socialAccounts',
      label: 'Social Media Accounts',
      required: false,
      hint: 'List of Social Media accounts',
      fields: [
        {
          name: 'type',
          label: 'Social Media site',
          widget: 'select',
          options: SOCIAL_MEDIA_ACCOUNT_TYPE_OPTIONS,
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
      options: SOCIAL_MEDIA_ACCOUNT_TYPE_OPTIONS.filter(
        type => type !== SOCIAL_MEDIA_ACCOUNT_TYPES.INSTAGRAM,
      ),
      required: true,
      multiple: true,
      hint: 'Which social media sharing buttons to show on the blog posts',
    },
  ],
};
