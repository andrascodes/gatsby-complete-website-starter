import React from 'react';

export default function CaptionedMDImage({ children, caption }) {
  return (
    <figure>
      {children}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
