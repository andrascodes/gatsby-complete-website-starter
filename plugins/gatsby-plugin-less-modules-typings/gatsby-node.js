const webpack = require('webpack');

const CSS_PATTERN = /\.less$/;
const MODULE_CSS_PATTERN = /\.module\.less$/;
const MODULE_DTS_PATTERN = /less\.d\.ts$/;

const isCssRules = rule =>
  rule.test &&
  (rule.test.toString() === CSS_PATTERN.toString() ||
    rule.test.toString() === MODULE_CSS_PATTERN.toString());

const findCssRules = config =>
  config.module.rules.find(
    rule => Array.isArray(rule.oneOf) && rule.oneOf.every(isCssRules),
  );

/**
 * See details at https://github.com/Jimdo/typings-for-css-modules-loader
 *
 * @type {import("gatsby").GatsbyNode["onCreateWebpackConfig"]}
 */
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const config = getConfig();
  const cssRules = findCssRules(config);

  if (cssRules) {
    cssRules.oneOf.forEach(statement => {
      statement.use = statement.use.map(item => {
        if (
          item.loader.match(/\/css-loader\//) &&
          item.options.modules === true
        ) {
          item.loader = 'typings-for-css-modules-loader';
          item.options = {
            ...item.options,
            namedExport: true,
            banner: '// Automatically generated - CSS classes available:\n',
          };
        }
        return item;
      });
    });
  }

  config.plugins.push(new webpack.WatchIgnorePlugin([MODULE_DTS_PATTERN]));

  actions.replaceWebpackConfig(config);
};
