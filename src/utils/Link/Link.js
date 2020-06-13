import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
// import { OutboundLink } from "react-ga";

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink

function Link({ children, to, ...props }) {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink to={to} {...props}>
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
  // return (
  //   <OutboundLink eventLabel={eventLabel || "outbound link"} to={to} {...other}>
  //     {children}
  //   </OutboundLink>
  // );
}

export default Link;
