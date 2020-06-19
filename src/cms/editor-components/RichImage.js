import React from 'react';
// Only imported in Netlify CMS, so this isn't added to the bundle
import showdown from 'showdown';
import RichImageWrapper from 'components/RichImageWrapper';

const converter = new showdown.Converter();

/**
 * Custom image component in Markdown. Used here to show caption, but can be expanded
 * to match whatever settings `gatsby-remark-images` have
 * See https://github.com/netlify/netlify-cms/blob/master/packages/netlify-cms-editor-component-image/src/index.js
 * @type {import("netlify-cms-core").EditorComponentOptions}
 */
const RichImage = {
  label: 'Rich image',
  id: 'richImage',
  // Helps Netlify CMS Recognize this block in the Markdown
  pattern: /^<rich-image><img src="(.*?)" alt="(.*?)" \/><figcaption>(.*?)<\/figcaption><\/rich-image>$/,
  fromBlock: match => {
    // Once the fields have been matched in the Regex, we need to pass the fields for the
    // visual editor in a format they understand, so HTML -> markdown
    if (match) {
      const caption = match[3];

      const captionMarkdown = converter.makeMarkdown(caption);
      return {
        image: match[1],
        caption: captionMarkdown,
        alt: match[2],
      };
    }
  },
  toBlock: ({ caption = '', image, alt = '' }) => {
    const captionHTML = converter.makeHtml(caption);
    /** This has to be in sync with our strict regex */
    return `<rich-image><img src="${image}" alt="${alt}" /><figcaption>${captionHTML}</figcaption></rich-image>`;
  },
  toPreview: ({ image, caption, alt }, getAsset, fields) => {
    const imageField = fields?.find(f => f.get('widget') === 'image');
    const src = getAsset(image, imageField);

    const captionHTML =
      caption !== 'undefined' ? converter.makeHtml(caption) : '';

    return (
      <RichImageWrapper>
        <img src={src || ''} alt={alt} />
        <figcaption
          dangerouslySetInnerHTML={{
            __html: captionHTML,
          }}
        ></figcaption>
      </RichImageWrapper>
    );
  },
  fields: [
    {
      label: 'Image',
      name: 'image',
      widget: 'image',
      media_library: {
        allow_multiple: false,
      },
    },
    {
      label: 'Caption',
      name: 'caption',
      widget: 'markdown',
      minimal: true,
      buttons: ['bold', 'italic', 'link'],
      editorComponents: [],
      hint: 'Will be used as caption',
    },
    {
      label: 'Alternate Text',
      name: 'alt',
      widget: 'string',
      hint:
        "Appears in place of an image if it fails to load on a user's screen. Screen-reading tools use it to describe images to visually impaired readers. Search engines use it to better crawl and rank the website.",
    },
  ],
};

export default RichImage;
