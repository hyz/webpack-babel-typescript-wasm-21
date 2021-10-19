import * as path from 'path';
import merge from 'webpack-merge';

import type * as webpack from 'webpack';
import type * as DevServerTypes from 'webpack-dev-server';
import configure from './configs/webpack';

type Configuration = webpack.Configuration | webpack.WebpackOptionsNormalized;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (env: any, opts: {mode: 'production' | 'development'}): Configuration {
  //console.log(JSON.stringify(env), __filename);
  process.env.NODE_ENV = opts.mode;
  process.env.BABEL_ENV = opts.mode;
  process.env.BROWSERSLIST_ENV = opts.mode;

  const isDev = opts.mode === 'development';
  const isServing = isDev && process.argv.includes('serve');

  const paths = {
    //output: path.resolve(__dirname, 'dist'),
    //outputFilename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    //outputChunkFilename: isDev ? '[name].js' : '[name].[contenthash:8].chunk.js',
    //outputPublicPath: '/dist/', // : isJamstack? "/" : "/static/",
    entry: './src/index.tsx',

    src: './src',
    public: './public',
    indexHtmlTemplate: path.resolve('./public', 'index.html'),
    wasmCrate: path.join(__dirname, 'crates'),
    wasmOutDir: path.join(__dirname, 'src/api/pkg'),
    assets: './assets',
    favicon: './public/favicon.ico',
  };

  const output: webpack.Configuration['output'] = {
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: isDev ? '[name].js' : '[name].[contenthash:8].chunk.js',
    publicPath: '/dist/', // : isJamstack? "/" : "/static/",
    assetModuleFilename: 'assets/[hash][ext][query]',
    //webassemblyModuleFilename: '[hash:8].wasm',
    // library: '',
    // libraryTarget: 'es5',
    crossOriginLoading: 'anonymous',
  };

  //const devServe = isDev && process.argv.includes('serve');

  const devServer /*:webpack.WebpackOptionsNormalized*/ = {
    devServer: <DevServerTypes.Configuration>{
      //contentBase: paths.output,
      allowedHosts: 'all',
      // host: '',
      port: process.env.PORT || 8080,
      compress: true,
      liveReload: true,
      hot: true,
      watchFiles: ['./src/**', output.path],
      // static: '',
    },
    watchOptions: {
      ignored: ['**/node_modules', '**/target', '**/dist'],
    },
  };
  const cfg = configure(opts, paths, output);
  console.log(JSON.stringify(cfg.output));

  return isServing ? merge(cfg, devServer) : cfg; //return {...cfg, ...devServer};
}
