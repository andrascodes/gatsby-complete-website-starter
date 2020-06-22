import React from 'react';
import showdown from 'showdown';

import PullquoteComponent from 'components/Pullquote';

const converter = new showdown.Converter();
/**
 * @type {import("netlify-cms-core").EditorComponentOptions}
 */
const Pullquote = {
  label: 'Pullquote',
  id: 'pullquote',
  // Helps Netlify CMS Recognize this block in the Markdown
  pattern: /^<pullquote>(.*?)<\/pullquote>$/,
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
    return `<pullquote>${quoteHTML}</pullquote>`;
  },
  toPreview: ({ quote }) => {
    const quoteHTML = quote !== 'undefined' ? converter.makeHtml(quote) : '';
    return <PullquoteComponent quote={quoteHTML} />;
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

export default Pullquote;
