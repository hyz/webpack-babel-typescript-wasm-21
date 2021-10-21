/* eslint-disable node/no-unpublished-require */
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
module.exports = api => {
  return {
    plugins: [
      [tailwindcss, {}],
      [autoprefixer, {}],
      ['postcss-import', {}],
      // 'postcss-nested': {},
      ['postcss-preset-env', {}],
      // 'postcss-pxtorem': {
      //   rootValue: 16,
      //   unitPrecision: 5,
      //   propList: ['*'],
      //   selectorBlackList: ['html', 'body'],
      //   replace: true,
      //   mediaQuery: false,
      //   minPixelValue: 0,
      // },
    ],
  };
};

