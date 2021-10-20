import * as path from 'path';
//import merge from 'webpack-merge';

import type {Configuration, WebpackOptionsNormalized, EntryObject} from 'webpack';
import type * as DevServerTypes from 'webpack-dev-server';
import type {CustomConfigs} from './configs/webpack';
import {configure} from './configs/webpack';

export default function (env: unknown, {mode}: {mode: 'production' | 'development'}): Configuration[] {
  //console.log(JSON.stringify(env), __filename);
  process.env.NODE_ENV = mode;
  process.env.BABEL_ENV = mode;
  process.env.BROWSERSLIST_ENV = mode;
  // const isDev = mode === 'development';

  const cfgs: CustomConfigs = {
    //basedir: __dirname,
    //public: './public',
    //assets: './assets',

    htmlWebpackPluginOptions: {
      template: `html-loader!${path.resolve('./public', 'index.html')}`,
      favicon: './public/favicon.ico',
      filename: 'index.html',
    },
    wasmPackPluginOptions: {
      crateDirectory: path.join(__dirname, 'crates'),
      outDir: path.join(__dirname, 'src/api/pkg'),
      outName: 'index',
      extraArgs: '--target web', //'--target web --mode normal',
    },
  };

  //const entry: EntryObject = { index: './main/index', preload: './main/preload', renderer: './src/index.tsx', };

  const output: Configuration['output'] = {
    clean: {dry: true, keep: _ => true}, //CleanOptions
    path: path.resolve(__dirname, 'dist'),
    // filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    //chunkFilename: isDev ? '[name].js' : '[name].[contenthash:8].chunk.js',
    publicPath: '/', // : isJamstack? "/" : "/static/",
    assetModuleFilename: '[hash:12][ext][query]',
    //webassemblyModuleFilename: '[hash:8].wasm',
    //library: '',
    // libraryTarget: 'es5',
    crossOriginLoading: 'anonymous',
  };

  //  const isServing = isDev && process.argv.includes('serve');
  //  const devServer: DevServerTypes.Configuration = {
  //    //contentBase: paths.output,
  //    allowedHosts: 'all',
  //    // host: '',
  //    port: process.env.PORT || 'auto',
  //    //compress: true,
  //    hot: true,
  //    //liveReload: true,
  //    //watchFiles: <DevServerTypes.WatchFiles>{
  //    //  paths: ['./src/**', './main/**', output.path],
  //    //  options: {
  //    //    ignored: ['**/node_modules', '**/target', '**/dist'],
  //    //  },
  //    //},
  //    // static: 'public', //default
  //    //onAfterSetupMiddleware: _ => {},
  //  };

  const cfg = configure(output, cfgs, {mode});
  cfg.node = {__dirname: false, __filename: false}; //global: false,
  // console.log(JSON.stringify(cfg.output));
  // output: {...cfg.output, filename: isDev ? '[name].js' : '[name].[contenthash:8].js'},
  //const renderer: Configuration = {...cfg, entry: {bundle: './src/index'}, target: 'electron-renderer'};
  const renderer: Configuration = {...cfg, entry: {bundle: './src/index'}};
  //const preload: Configuration = {...cfg, entry: {preload: './main/preload'}, target: 'electron-preload'};
  //const main: Configuration = {...cfg, entry: {index: './main/index'}, target: 'electron-main'};

  //cfg.plugins .push (
  //  // new CopyPlugin({
  //  //   patterns: [
  //  //     {
  //  //       from: cfgs.public,
  //  //       to: output.path,
  //  //       globOptions: {ignore: ['**/index.html']},
  //  //       noErrorOnMissing: true,
  //  //     },
  //  //   ],
  //  // }),
  //  );

  return [renderer];
  //return [isServing ? <WebpackOptionsNormalized>{...renderer, devServer} : renderer];
  //return [main, preload, isServing ? <WebpackOptionsNormalized>{...renderer, devServer} : renderer];
  //return [isServing ? <WebpackOptionsNormalized>{devServer, ...renderer} : renderer];
} // init
