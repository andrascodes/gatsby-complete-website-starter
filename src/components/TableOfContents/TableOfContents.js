import React from 'react';
import Link from 'utils/Link';

function HeadingItem({ url, title, items }, index) {
  console.log(title, url);
  return (
    <ul key={`toc-${title}-${index}`}>
      <li>
        {title && <Link to={url}>{title}</Link>}
        {items && items.length > 0 && items.map(HeadingItem)}
      </li>
    </ul>
  );
}

export default function TableOfContents({ headings }) {
  return <>{headings.map(HeadingItem)}</>;
}
