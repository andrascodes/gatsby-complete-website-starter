/**
 * File used by the Apollo VSCode extension to provide the environment
 */
module.exports = {
  client: {
    name: 'gatsby-complete-website-starter',
    tagName: 'graphql',
    includes: [
      './src/**/*.js',
      './src/__generated__/gatsby-plugin-documents.graphql',
    ],
    service: {
      name: 'GatsbyJS',
      localSchemaFile: './src/__generated__/gatsby-schema.graphql',
    },
  },
};
