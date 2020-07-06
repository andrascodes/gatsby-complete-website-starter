/**
 * @method
 * @param {object} options
 * @param {string} options.name
 * @param {string} options.label
 * @param {Boolean} [options.required]
 * @param {string} [options.hint]
 * @param {boolean} [options.collapsed]
 * @param {?[string, string]} [options.imagePattern]
 *
 * @returns {import("netlify-cms-core").CmsField}
 */
export default ({ name, label, required, hint, collapsed, imagePattern }) => ({
  widget: 'object',
  name,
  label,
  required: Boolean(required),
  hint,
  collapsed: Boolean(collapsed),
  fields: [
    {
      widget: 'image',
      name: 'image',
      label: 'Image',
      required: Boolean(required),
      pattern:
        imagePattern === null
          ? undefined
          : imagePattern || [
              '.(gif|jpeg|jpg|png)+$',
              'Must be PNG, JPEG or GIF',
            ],
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
});
