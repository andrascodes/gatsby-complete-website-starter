import React from 'react';
import Remark from 'remark';
import toHAST from 'mdast-util-to-hast';

import { PostTemplate } from 'templates/post';

let remark = new Remark().data(`settings`, {});

/**
 * @type {React.ComponentType<import("netlify-cms-core").PreviewTemplateComponentProps>}
 */
const PostPreview = ({ entry, widgetFor }) => {
  return (
    <PostTemplate
      title={entry.getIn(['data', 'title'])}
      body={widgetFor('body')}
    />
  );
};

export default PostPreview;
