module.exports = {
  meta: {
    docs: {},
    fixable: 'code'
  },

  create(context) {
    function deprecated(fixCallee) {
      return node => {
        if (!fixCallee) {
          context.report({node, message: '@github/query-selector is deprecated'})
        } else {
          context.report({
            node,
            message: '@github/query-selector is deprecated',
            fix(fixer) {
              const [el] = node.arguments
              const source = context.getSourceCode()
              const fixes = [fixer.replaceText(node.callee, `${source.getText(el)}.${fixCallee}`)]
              fixes.push(fixer.remove(node.arguments[0]))
              const argTokens = source.getTokensBetween(node.arguments[0], node.arguments[1])
              fixes.push(...argTokens.map(t => fixer.remove(t)))
              if (node.arguments.length === 3) {
                const typeArgTokens = source.getTokensBetween(node.arguments[1], node.arguments[2])
                fixes.push(...typeArgTokens.map(t => fixer.remove(t)))
                fixes.push(fixer.remove(node.arguments[2]))
                fixes.push(fixer.insertTextAfter(node.callee, `<${node.arguments[2].name}>`))
              }
              return fixes
            }
          })
        }
      }
    }
    return {
      ['CallExpression[callee.name="closest"]']: deprecated('closest'),
      ['CallExpression[callee.name="querySelectorAll"]']: deprecated('querySelectorAll'),
      ['CallExpression[callee.name="query"]']: deprecated('querySelector'),
      ['CallExpression[callee.name="namedItem"]']: deprecated('elements.namedItem'),
      ['CallExpression[callee.name="getAttribute"]']: deprecated()
    }
  }
}
