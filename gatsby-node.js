/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { spawnSync } = require('child_process');
const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

/** @type {import("gatsby").GatsbyNode["onCreateNode"]} */
exports.onCreateNode = async ({
  node,
  actions: { createNodeField },
  getNode,
}) => {
  // We only need to process MarkdownRemark files
  if (node.internal.type !== 'MarkdownRemark') return;

  /** Filesystem slug */
  const websitePath = createFilePath({ node, getNode, trailingSlash: false });

  createNodeField({
    node,
    name: `path`,
    value: websitePath,
  });

  /**
   * Add modification time to fields
   * Source: https://github.com/saberland/saber/blob/master/packages/saber-plugin-git-modification-time/lib/index.js
   */
  const fileNode = getNode(node.parent);
  const { stdout } = spawnSync(
    'git',
    ['log', '-1', '--pretty=format:%aI', '--', fileNode.absolutePath],
    {
      encoding: 'utf8',
    },
  );

  createNodeField({
    node,
    name: 'dateModified',
    value: new Date(stdout).getTime(),
  });
};

/** @type {import("gatsby").GatsbyNode["createPages"]} */
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const { data, errors } = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              path
            }
            frontmatter {
              template
            }
          }
        }
      }
    }
  `);

  if (errors) {
    errors.forEach(e => console.error(e.toString()));
    return Promise.reject(errors);
  }

  const markdownFiles = data.allMarkdownRemark.edges;

  markdownFiles.forEach(edge => {
    if (!edge.node.frontmatter.template) return;

    const id = edge.node.id;

    createPage({
      /** If a slug was specified in the frontmatter, this takes precedence */
      path: edge.node.fields.path,
      component: path.resolve(
        `src/templates/${String(edge.node.frontmatter.template)}.js`,
      ),
      // additional data can be passed via context
      context: {
        id,
      },
    });
  });
};

/** @type {import("gatsby").GatsbyNode["onCreateDevServer"]} */
exports.onCreateDevServer = () => {
  /**
   * Start the Netlify CMS file proxy server, which is used to turn local
   * CMS "Publish" to file saves
   */
  require('netlify-cms-proxy-server');
};
