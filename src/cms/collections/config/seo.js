// import { getSocialLinksSchema, getImageSchema } from "../utils";
import { SOCIAL_MEDIA_ACCOUNT_TYPES } from 'shared/constants';

const SOCIAL_MEDIA_ACCOUNT_TYPE_OPTIONS = Object.values(
  SOCIAL_MEDIA_ACCOUNT_TYPES,
);

export const COLLECTION_NAME = 'seo';

/** @type {import("netlify-cms-core").CmsCollectionFile} */
export default {
  name: COLLECTION_NAME,
  label: 'SEO config',
  file: 'content/config/seo.md',
  media_folder: 'uploads',
  public_folder: 'uploads',
  fields: [
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
    // {
    //   widget: 'string',
    //   name: 'titleTemplate',
    //   label: 'Template for the page titles',
    //   required: false,
    //   hint: `Use "%s" to mark where the specific page title goes. For example: "%s | Inex One" will result in "Blog | Inex One". IMPORTANT: Keep the title below 50-60 characters long!`,
    //   default: '%s',
    // },
    // {
    //   widget: 'string',
    //   name: 'defaultTitle',
    //   label: 'Default Title',
    //   required: true,
    //   hint:
    //     "Default title of the pages where there's no title specified. IMPORTANT: Keep the title below 50-60 characters long!",
    // },
    // {
    //   widget: 'string',
    //   name: 'defaultDescription',
    //   label: 'Default Description',
    //   required: true,
    //   hint:
    //     "Default description of the pages where it's not specified (can be used as Site-wide description) IMPORTANT: Keep the description below 155–160 characters!",
    // },
    // {
    //   widget: 'string',
    //   name: 'defaultAuthor',
    //   label: 'Default Author',
    //   required: true,
    //   hint:
    //     "Default author of the pages where it's not specified (should represent the company and not an individual person)",
    // },
    // getImageSchema({
    //   name: 'defaultImage',
    //   label: 'Default Social Image',
    //   hint:
    //     'The default image that appears on cards when sharing to social media. It should have a 16:9, 1.91:1 or 2:1 aspect ratio with a resolution above 800,000 pixels when multiplying width and height and it must be a PNG, JPEG or GIF',
    // }),
    // getImageSchema({
    //   name: 'logoImage',
    //   label: 'Organization Logo',
    //   hint:
    //     'Logo image should have a 16:9, 4:3 or 1:1 aspect ratio with a resolution above 800,000 pixels when multiplying width and height and it must be a PNG, JPEG or GIF',
    // }),
    {
      widget: 'string',
      name: 'identifier',
      label: 'Identifier',
      hint: `Development field. DO NOT CHANGE!`,
      required: true,
      default: COLLECTION_NAME,
    },
  ],
};
