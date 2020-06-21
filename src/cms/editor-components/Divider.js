import React from 'react';

import DividerComponent, { DIVIDER_TYPES } from 'components/Divider';

/**
 * @type {import("netlify-cms-core").EditorComponentOptions}
 */
const Divider = {
  label: 'Divider',
  id: 'divider',
  // Helps Netlify CMS Recognize this block in the Markdown
  pattern: /^<divider type="(.*?)"><\/divider>$/,
  fromBlock: match => {
    if (match) {
      return {
        type: match[1],
      };
    }
  },
  toBlock: ({ type = DIVIDER_TYPES.DOTTED.value }) => {
    return `<divider type="${type}"></divider>`;
  },
  toPreview: ({ type }) => {
    return <DividerComponent type={type} />;
  },
  fields: [
    {
      label: 'Type',
      name: 'type',
      widget: 'select',
      options: Object.values(DIVIDER_TYPES),
    },
  ],
};

export default Divider;
