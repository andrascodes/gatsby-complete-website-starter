import React from 'react';
import { Map } from 'immutable';
import { PostTemplate } from 'templates/post';

/**
 * @type {React.ComponentType<import("netlify-cms-core").PreviewTemplateComponentProps>}
 */
const PostPreview = ({
  entry,
  widgetFor,
  fieldsMetaData,
  boundGetAsset,
  config,
}) => {
  const authorEmail = entry.getIn(['data', 'author']);

  const authorEntry = fieldsMetaData.getIn(
    ['author', 'author', authorEmail],
    Map({}),
  );

  const authorCollection = config
    .get('collections')
    .find(collection => collection.get('name') === 'author');

  // Creating a function able to get assets for entries in the "author" collection
  const getAuthorAsset = boundGetAsset(
    authorCollection,
    // This is used to compute the filesystem/git tree path to the image
    Map({
      path: 'content/authors/author-slug.md',
    }),
  );

  const authorImage = getAuthorAsset(authorEntry.getIn(['avatar', 'image']));

  //   const tags = entry.getIn(['data', 'tags'])
  //     ? entry.getIn(['data', 'tags']).toJS()
  //     : [];

  return (
    <PostTemplate
      post={{
        frontmatter: {
          title: entry.getIn(['data', 'title']),
          subtitle: entry.getIn(['data', 'subtitle']),
          date: entry.getIn(['data', 'date']),
          author: {
            frontmatter: {
              name: authorEntry.get('name'),
            },
          },
        },
        timeToRead: 8,
      }}
      seoConfig={['Facebook', 'Twitter', 'LinkedIn']}
      body={widgetFor('body')}
    />
  );
};

export default PostPreview;
