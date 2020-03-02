module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  extends: ['standard', 'standard-react'],
  plugins: ['extra-rules', 'fp', 'no-null'],
  rules: {
    'no-console': 'error',
    'no-inline-comments': 'error',
    'multiline-comment-style': ['error', 'starred-block'],
    'extra-rules/no-commented-out-code': 'error',
    'fp/no-class': 'error',
    'fp/no-delete': 'error',
    'fp/no-loops': 'error',
    'fp/no-mutation': ['error', {
      commonjs: true,
      exceptions: [
        { property: 'story' },
        { property: 'propTypes' },
        { property: 'defaultProps' }
      ]
    }],
    'fp/no-mutating-assign': 'error',
    'fp/no-mutating-methods': 'error',
    'no-var': 'error',
    'no-undefined': 'error',
    'no-null/no-null': 'error',
    camelcase: ['error', { properties: 'always' }]
  }
}
