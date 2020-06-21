const visit = require('unist-util-visit');
module.exports = ({ markdownAST }, pluginOptions) => {
  //   console.log('ast', markdownAST);
  visit(markdownAST, 'paragraph', (node, index, parent) => {
    const hasHTMLNode = node.children.some(child => child.type === 'html');

    if (!hasHTMLNode) return;

    // console.log('node', node);

    // Remove node (node): paragraph node where every child is "html"
    // In Parent children, replace the node (parent's child at index) with the node.children
    parent.children.splice(index, 1, ...node.children);

    return index;
  });
  return markdownAST;
};
