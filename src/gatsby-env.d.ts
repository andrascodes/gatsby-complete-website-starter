/**
 * Source: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/lib/react-app.d.ts
 */
// // Reflect the settings chosen for gatsby-plugin-react-svg:
// // SVG files are inline in the icons folder, rest are handled by gatsby's default webpack config
// declare module "assets/icons/*.svg" {
//   import * as React from "react";
//   const ReactComponent: SVG;
//   export default ReactComponent;
// }
declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

/**
 * Fallback definition for when less modules .d.ts aren't there
 */
declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
