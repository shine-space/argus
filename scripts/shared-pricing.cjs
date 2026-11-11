const acorn = require('acorn');

function patchPricingCards(source) {
  const ast = acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  const edits = [];
  let data = 0, badge = 0, option = 0;
  const name = node => node?.name ?? node?.value;
  function walk(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'AssignmentExpression' && node.right.type === 'ObjectExpression' &&
        node.right.properties.some(property => name(property.key) === 'plans')) {
      edits.push({ start: node.right.start, end: node.right.end, text: '{plans:pricingPlans}' });
      data++;
    }
    if (node.type === 'ObjectExpression') {
      const className = node.properties.find(property => name(property.key) === 'className');
      const value = className?.value;
      const text = value?.type === 'TemplateLiteral' && !value.expressions.length ? value.quasis[0].value.cooked : value?.value;
      if (text === 'fcpr-pop') {
        const children = node.properties.find(property => name(property.key) === 'children').value;
        edits.push({ start: children.start, end: children.end, text: 'pricingPopularLabel' });
        badge++;
      }
    }
    if (node.type === 'ObjectPattern') {
      const property = node.properties.find(property => name(property.key) === 'popularLabel');
      if (property) {
        if (source[property.end] !== ',') throw Error('Inspect pricing options before changing the component');
        edits.push({ start: property.start, end: property.end + 1, text: '' });
        option++;
      }
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(walk);
      else if (value?.type) walk(value);
    }
  }
  walk(ast);
  if (data !== 1 || badge !== 1 || option !== 1) throw Error('Unexpected pricing component structure');
  for (const edit of edits.sort((a, b) => b.start - a.start)) source = source.slice(0, edit.start) + edit.text + source.slice(edit.end);
  source = 'import {pricingPlans,pricingPopularLabel} from "/company-copy/pricing-plans.mjs?v=1";\n' + source;
  acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  return source;
}

module.exports = { patchPricingCards };
