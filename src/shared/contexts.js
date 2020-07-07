import React from 'react';

/**
 * @type {{ shareButtonProps: ShareButton.Props[] }}
 */
const defaultPostState = {
  shareButtonProps: [],
};
export const PostContext = React.createContext(defaultPostState);
