/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    /**
     * Handle Markdown files
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `authors`,
        path: `${__dirname}/content/authors`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              /** Maximum width that we allow for our images. Content width is 750 and we add a bit more for zooming and images breaking */
              maxWidth: 1200,
              backgroundColor: 'transparent',
              withWebp: false,
              disableBgImageOnAlpha: true,
              linkImagesToOriginal: false,
              // Title attribute used as caption
              showCaptions: false,
            },
          },
          `gatsby-remark-images-medium-zoom`,
        ],
      },
    },
    `gatsby-plugin-catch-links`,

    /**
     * Generate TS type definitions for the GraphQL queries
     */
    {
      resolve: `gatsby-plugin-typegen`,
      options: {
        emitSchema: {
          'src/__generated__/gatsby-schema.graphql': true,
          'src/__generated__/gatsby-introspection.json': true,
        },
        emitPluginDocuments: {
          'src/__generated__/gatsby-plugin-documents.graphql': true,
        },
      },
    },
    /** Import statements relative to src/ */
    `gatsby-alias-imports`,

    /**
     * Netlify CMS
     *
     * Adds the /admin endpoint with authentication,
     * being initialized at src/cms/cms.js
     *
     * Should come after gatsby-plugin-manifest
     * https://github.com/netlify/netlify-cms/issues/2925
     */
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        manualInit: true,
        enableIdentityWidget: false,
        customizeWebpackConfig: config => {
          // Sets the template for the CMS to an index.html where the title can be change or the URL can be manipulated
          const htmlPlugin = config.plugins.find(
            plugin => plugin.constructor.name === 'HtmlWebpackPlugin',
          );
          if (htmlPlugin) {
            htmlPlugin.options.template = `${__dirname}/src/cms/index.html`;
          }
        },
      },
    },
  ],
  mapping: {
    // Keep this in sync with the data structure
    // Mapping post.author to author.email
    'MarkdownRemark.frontmatter.author': `MarkdownRemark.frontmatter.email`,
  },
};
