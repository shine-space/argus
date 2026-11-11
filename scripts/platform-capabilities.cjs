const acorn = require('acorn');

function findCall(source, className) {
  const tree = acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  let result;
  function visit(node) {
    if (!node || typeof node !== 'object' || result) return;
    if (node.type === 'CallExpression') {
      const props = node.arguments[1];
      if (props?.type === 'ObjectExpression') {
        const value = props.properties.find(p => p.key?.name === 'className')?.value;
        const name = value?.type === 'TemplateLiteral' ? value.quasis[0].value.cooked : value?.value;
        if (name === className) { result = node; return; }
      }
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }
  visit(tree);
  return result;
}

function removeHomepageCapabilities(source) {
  const node = findCall(source, 'framer-kbb3qa');
  return node ? source.slice(0, node.start) + 'null' + source.slice(node.end) : source;
}

module.exports = { findCall, removeHomepageCapabilities };
