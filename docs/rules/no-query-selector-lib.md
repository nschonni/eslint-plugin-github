# No @github/query-selector lib

This rule is mainly here as a codemod to replace callsites that use the [@github/query-selector](https://github.com/github/query-selector) library.

# Why disallow `@github/query-selector`?

The library was originally designed to address shortcomings in [FlowType](https://flow.org/), as addressed by the ["Motivations" section of the libraries readme](https://github.com/github/query-selector#motivation). The GitHub.com codebase has since transitioned to TypeScript, reducing the utility this library gives. Given this, we've made the choice to deprecate `@github/query-selector` in favour of using the native APIs coupled with TypeScript casts. Rather than refactor all callsites manually, it makes sense to create an eslint fixer to automate these.

If you're not using `@github/query-selector` then this rule should not be enabled. If you've completed the transition away from `@github/query-selector` then this rule should not be enabled. This rule will be removed in the next major version of this plugin.
