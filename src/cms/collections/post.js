// import { getImageSchema, slugField } from "./utils";

export const COLLECTION_NAME = 'post';

/**
 * TODO: Extend this type with the 'hint' prop
 * @type {import("netlify-cms-core").CmsCollection}
 */
const post = {
  name: COLLECTION_NAME,
  label: 'Blog posts',
  label_singular: 'Blog post',

  /** optional text, displayed below the label when viewing a collection */
  description: 'Blog posts',

  /**
   * folder - configure where to save the content (relative to base of repo)
   *    e.g. folder: posts -> posts/post-title.md
   *
   * Collections come in 2 types, folder and file collections:
   * - Folder:
   *    - one or more files with the same format, fields, and configuration options,
   *    - all stored within the same folder in the repository
   *    - option to allow editors to create new items in the collection ('create' field)
   *    - must have at least 1 field (`title`: string) for creating new entry slugs
   *       `identifier_field` can be used to specify a field different to `title` for this
   *
   * - File:
   *    - one or more unqiuely configured files
   *    - each item in a `files` collection has an explicitly set path (relative to the base of the repo),
   *        filename and config
   *    - useful for settings, custom landing page with a unique content structure
   *    - configure each file seperately and list them under the `files` field
   */
  folder: 'content/pages/blog',
  create: true,

  /**
   * Changes the options for the editor view of the collection.
   * - preview: (default: true), disables the preview pane
   */
  editor: {
    preview: true,
  },
  /**
   * path - allows saving content in subfolders
   *    e.g. path: '{{year}}/{{slug}}' -> posts/2019/post-title.md
   * https://www.netlifycms.org/docs/beta-features/#folder-collections-path
   */
  path: '{{slug}}/index',

  /**
   * A Deploy preview URL (root of deployed site) is provided by the backend.
   * This preview_path is used to build a path to the specific content's preview.
   * If preview_path is not provided the URL will be used as is.
   *
   * Available template tags:
   * - {{slug}}: the entire slug (the field in this collection config)
   * - the date based template tags
   * - {{filename}}
   * - {{extension}}
   */
  preview_path: '/blog/{{fields.slug}}',

  /**
   * Per collection Media and Public Folders (Gatbsy works best with relative img paths)
   * Specifies a relative media folder for the collection.
   * Media files are saved in the same directory as the entry.
   * The path to the image will be the relative path.
   */
  media_folder: '',
  public_folder: '',

  /**
   * What shows on the list of collection items.
   *
   * Available template tags (in addition to those for the slug):
   * - {{filename}}
   * - {{extension}}
   * - {{commit_date}}
   * - {{commit_author}}
   */
  summary: '{{year}}-{{month}}-{{day}} - {{title}}',

  /**
   * List of sort fields to show in the UI.
   * `title`, `date`, `author` and `description` fields are inferred.
   * `Update on` is also shown by default.
   */
  sortableFields: ['published'],

  /**
   * Determines how collection files are parsed and saved.
   * The file extension searched for when finding existing entries.
   * Values: yml, yaml, toml, json, md, markdown, html
   */
  extension: 'md',

  /**
   * Specifies a template for generating new filenames based on a file's creation
   * date and `title` field.
   * Can reference a field value by name: `{{title}}`
   * if you have a field named `slug`, and would like to reference that field
   * via `{{slug}}`,
   * you can do so by adding the explicit `fields`. prefix, eg. `{{fields.slug}}`
   * - `{{slug}}` - url-safe version of the `title` field for the file
   * - `{{year}}-{{month}}-{{day}} {{hour}}:{{minute}}:{{second}}`
   */
  // slug: "{{fields.slug}}",

  /**
   * Maps editor UI widgets to field-value pairs.
   * - name: (required) unique id
   * - label: what appears in the Editor UI
   * - widget
   * - default: default value for field (only works for folder collection type)
   * - required
   * - pattern: [<regex pattern>, <error message>]
   */
  fields: [
    {
      widget: 'string',
      name: 'title',
      label: 'Title',
      required: true,
      hint: 'The title of the post.',
    },
    // slugField,
    {
      widget: 'hidden',
      name: 'published',
      label: 'Published?',
      required: false,
      default: true,
    },
    {
      label: 'Post Author',
      name: 'author',
      widget: 'relation',
      collection: 'author',
      searchFields: ['name'],
      valueField: 'email',
      displayFields: ['name'],
    },
    {
      widget: 'string',
      name: 'subtitle',
      label: 'Subtitle',
      required: false,
      hint: 'The text shown just below the Title or the Featured Image.',
    },
    {
      widget: 'text',
      name: 'description',
      label: 'Description',
      required: false,
      hint:
        'Will be used for SEO, and to describe the article. Leave empty for auto-generated',
    },
    {
      widget: 'datetime',
      name: 'date',
      label: 'Publication date',
      required: true,
      hint:
        "When the article is published. Don't change if you edit it, we take can of that.",
    },
    // {
    //   label: "Tags",
    //   name: "tags",
    //   required: true,
    //   widget: "relation",
    //   collection: "blogTags",
    //   searchFields: ["title"],
    //   valueField: "title",
    //   multiple: true,
    //   hint: "Go back to Blog tags to edit the options",
    // },
    // {
    //   label: "Related Blogposts",
    //   name: "relatedPosts",
    //   required: false,
    //   widget: "relation",
    //   collection: collectionName,
    //   searchFields: ["title"],
    //   valueField: "slug",
    //   displayFields: ["title"],
    //   multiple: true,
    // },
    // getImageSchema({
    //   name: "thumbnail",
    //   label: "Thumbnail image",
    //   hint: "The image shown in the blog feed. Required.",
    //   required: true,
    //   collapsed: true,
    // }),
    // getImageSchema({
    //   name: "featuredImage",
    //   label: "Featured image",
    //   hint: "The image shown on top. Not used atm",
    //   collapsed: true,
    // }),
    {
      widget: 'hidden',
      name: 'template',
      label: 'Template',
      required: true,
      // @ts-ignore TODO: remove when type CmsCollection is extended
      default: COLLECTION_NAME,
    },
    {
      widget: 'markdown',
      name: 'body',
      label: 'Content',
      required: true,
      // @ts-ignore TODO: remove when type CmsCollection is extended
      hint: 'Page content',
    },
  ],
  /**
   * The entries for any folder collection can be filtered based on the value of a single field
   * Files with different fields, options and extensions can be managed in the same folder.
   */
  filter: {
    field: 'template',
    value: COLLECTION_NAME,
  },
};

export default post;
