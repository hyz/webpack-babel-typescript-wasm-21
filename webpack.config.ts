import * as path from 'path';
//import merge from 'webpack-merge';

import type {Configuration, WebpackOptionsNormalized} from 'webpack';
import type * as DevServerTypes from 'webpack-dev-server';
import configure from './configs/webpack';

type WebpackConfiguration = Configuration | WebpackOptionsNormalized;
export default function (env: unknown, {mode}: {mode: 'production' | 'development'}): WebpackConfiguration {
  //console.log(JSON.stringify(env), __filename);
  process.env.NODE_ENV = mode;
  process.env.BABEL_ENV = mode;
  process.env.BROWSERSLIST_ENV = mode;

  const isDev = mode === 'development';
  const isServing = isDev && process.argv.includes('serve');

  const paths = {
    entry: './src/index.tsx',

    src: './src',
    public: './public',
    indexHtmlTemplate: path.resolve('./public', 'index.html'),
    wasmCrate: path.join(__dirname, 'crates'),
    wasmOutDir: path.join(__dirname, 'src/api/pkg'),
    assets: './assets',
    favicon: './public/favicon.ico',
  };

  const output: Configuration['output'] = {
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: isDev ? '[name].js' : '[name].[contenthash:8].chunk.js',
    publicPath: '/dist/', // : isJamstack? "/" : "/static/",
    assetModuleFilename: 'assets/[hash][ext][query]',
    //webassemblyModuleFilename: '[hash:8].wasm',
    //library: '',
    // libraryTarget: 'es5',
    crossOriginLoading: 'anonymous',
  };

  const devServer: DevServerTypes.Configuration = {
    //contentBase: paths.output,
    allowedHosts: 'all',
    // host: '',
    port: process.env.PORT || 8080,
    compress: true,
    liveReload: true,
    hot: true,
    watchFiles: <DevServerTypes.WatchFiles>{
      paths: ['./src/**', output.path],
      options: {
        ignored: ['**/node_modules', '**/target', '**/dist'],
      },
    },
    // static: 'public', //default
    //onAfterSetupMiddleware: _ => {},
  };

  const cfg = configure({mode}, paths, output);
  console.log(JSON.stringify(cfg.output));

  return isServing ? <WebpackOptionsNormalized>{devServer, ...cfg} : cfg;
}
