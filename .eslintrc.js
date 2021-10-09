module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  extends: [
    './node_modules/gts', // Use google typescript styleguide
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/consistent-type-imports': ['error', {prefer: 'type-imports'}],
    '@typescript-eslint/no-empty-function': ['error', {allow: ['methods', 'arrowFunctions']}],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-var-requires': ['warn'],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': ['warn'],
    'no-debugger': ['error'],
  },
  overrides: [
    {
      files: ['webpack.config.ts', 'test/**/*.js'],
      rules: {
        'node/no-unpublished-require': 'off',
        'node/no-unpublished-import': 'off',
      },
    },
  ],
};
