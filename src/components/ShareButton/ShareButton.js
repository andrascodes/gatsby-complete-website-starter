import React from 'react';

import { SOCIAL_MEDIA_ACCOUNT_TYPES } from 'shared/constants';

import * as Buttons from './Buttons';

const COPY_TYPE = 'copy';

const buttonMap = {
  [SOCIAL_MEDIA_ACCOUNT_TYPES.FACEBOOK]: Buttons.Facebook,
  [SOCIAL_MEDIA_ACCOUNT_TYPES.TWITTER]: Buttons.Twitter,
  [SOCIAL_MEDIA_ACCOUNT_TYPES.LINKEDIN]: Buttons.LinkedIn,
  [COPY_TYPE]: Buttons.Copy,
};

export default function ShareButton({ type, ...props }) {
  const ButtonComponent = buttonMap[type];

  if (!ButtonComponent) return null;

  return <ButtonComponent {...props} />;
}
