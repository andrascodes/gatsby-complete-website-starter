import React from 'react';
import showdown from 'showdown';

import BlockquoteComponent from 'components/Blockquote';

const converter = new showdown.Converter();
/**
 * @type {import("netlify-cms-core").EditorComponentOptions}
 */
const Blockquote = {
  label: 'Blockquote',
  id: 'blockquote',
  // Helps Netlify CMS Recognize this block in the Markdown
  pattern: /^<blockquote>(.*?)<\/blockquote>$/,
  fromBlock: match => {
    const quoteHTML = match[1];
    const quoteMarkdown = converter.makeMarkdown(quoteHTML);
    if (match) {
      return {
        quote: quoteMarkdown,
      };
    }
  },
  toBlock: ({ quote = '' }) => {
    const quoteHTML = converter.makeHtml(quote);
    return `<blockquote>${quoteHTML}</blockquote>`;
  },
  toPreview: ({ quote }) => {
    const quoteHTML = quote !== 'undefined' ? converter.makeHtml(quote) : '';
    return <BlockquoteComponent quote={quoteHTML} />;
  },
  fields: [
    {
      label: 'Quote',
      name: 'quote',
      widget: 'markdown',
      minimal: true,
      buttons: ['bold', 'link'],
      editorComponents: [],
    },
  ],
};

export default Blockquote;
