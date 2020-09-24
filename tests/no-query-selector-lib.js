const rule = require('../lib/rules/no-query-selector-lib')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('no-query-selector-lib', rule, {
  valid: [
    {
      code: 'document.querySelector("foo")'
    },
    {
      code: 'el.querySelectorAll("foo")'
    },
    {
      code: 'el.getAttribute("foo")'
    }
  ],
  invalid: [
    {
      code: 'querySelectorAll(document, "foo")',
      output: 'document.querySelectorAll( "foo")',
      errors: [
        {
          message: '@github/query-selector is deprecated',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'query(document, "foo")',
      output: 'document.querySelector( "foo")',
      errors: [
        {
          message: '@github/query-selector is deprecated',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'query(document, "foo", HTMLFooElement)',
      output: 'document.querySelector<HTMLFooElement>( "foo" )',
      errors: [
        {
          message: '@github/query-selector is deprecated',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'closest(document, "foo", HTMLFooElement)',
      output: 'document.closest<HTMLFooElement>( "foo" )',
      errors: [
        {
          message: '@github/query-selector is deprecated',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'namedItem(form, "foo", HTMLFooElement)',
      output: 'form.elements.namedItem<HTMLFooElement>( "foo" )',
      errors: [
        {
          message: '@github/query-selector is deprecated',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'getAttribute(form, "foo")',
      errors: [
        {
          message: '@github/query-selector is deprecated',
          type: 'CallExpression'
        }
      ]
    },
  ]
})
