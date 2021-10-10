/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

/**
 * Babel configuration.
 *
 * @see https://babeljs.io/docs/en/options
 * @param {import("@babel/core").ConfigAPI} api
 * @returns {import("@babel/core").TransformOptions}
 */
module.exports = function (api) {
  console.log(`babel.config.js: ${JSON.stringify(api)}, env: ${api.env()}`);
  const isDev = api.env() === 'development';

  const presets = ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']; // , ...(!isDev && ['minify'])
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-typescript',
    '@babel/plugin-transform-runtime',
    //'@emotion/babel-plugin',
    isDev && 'react-refresh/babel',
    // "react-hot-loader/babel"
  ].filter(Boolean);
  const overrides = [
    {test: /\.ts$/, presets: ['@babel/preset-typescript']},
    {
      test: /\.(jsx|tsx)$/,
      presets: [
        [
          '@babel/preset-react',
          {
            development: isDev,
            useBuiltIns: true,
            runtime: 'automatic',
            importSource: '@emotion/react',
          },
        ],
      ],
      plugins: ['@emotion/babel-plugin'],
    },
    {
      test: '**/*.d.ts',
      presets: [['@babel/preset-env', {targets: {esmodules: true}}]],
    },
  ];
  return {
    compact: !isDev,
    sourceType: 'unambiguous',
    // rootMode: 'upward',
    //cacheCompression: false,
    //cacheDirectory: '.cache/babel',

    presets,
    plugins,
    overrides,
  };
};
