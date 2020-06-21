/**
 * @type {import("netlify-cms-core").CmsCollection}
 */
const author = {
  name: 'author',
  label: 'Author',
  folder: 'content/authors',
  //   description: "Entries are used for article authors and leadership page",
  create: true,
  slug: '{{fields.name}}',
  media_folder: 'avatars',
  editor: {
    preview: false,
  },
  fields: [
    {
      name: 'name',
      widget: 'string',
      label: 'Name',
      required: true,
    },
    {
      name: 'email',
      widget: 'string',
      label: 'Email',
      hint: 'Not shown publicly atm',
      required: true,
    },

    // Image Schema
    {
      widget: 'object',
      name: 'avatar',
      label: 'Avatar',
      required: true,
      hint: `Avatar image should have a 1:1 aspect ratio with a resolution above 895x895 and it must be a PNG, JPEG or GIF.`,
      collapsed: false,
      fields: [
        {
          widget: 'image',
          name: 'image',
          label: 'Image',
          required: true,
          pattern: ['.(gif|jpeg|jpg|png)+$', 'Must be PNG, JPEG or GIF'],
          // imagePattern === null
          //   ? undefined
          //   : imagePattern || [
          //       '.(gif|jpeg|jpg|png)+$',
          //       'Must be PNG, JPEG or GIF',
          //     ],
        },
        {
          widget: 'string',
          name: 'alt',
          label: 'Alt text',
          required: false,
          hint:
            "Appears in place of an image if it fails to load on a user's screen. Screen-reading tools use it to describe images to visually impaired readers. Search engines use it to better crawl and rank the website.",
        },
        {
          widget: 'string',
          name: 'caption',
          label: 'Caption text',
          required: false,
          hint: 'Image caption (used for SEO purposes)',
        },
      ],
    },

    {
      name: 'body',
      label: 'Bio',
      widget: 'markdown',
      required: false,
    },
  ],
};
export default author;
