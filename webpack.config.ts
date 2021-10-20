import * as path from 'path';
//import merge from 'webpack-merge';

import type {Configuration, WebpackOptionsNormalized, EntryObject} from 'webpack';
import type * as DevServerTypes from 'webpack-dev-server';
import type {Paths} from './configs/webpack';
import {configure} from './configs/webpack';

type ReturnType = Configuration; // | WebpackOptionsNormalized;
export default function (env: unknown, {mode}: {mode: 'production' | 'development'}): ReturnType[] {
  //console.log(JSON.stringify(env), __filename);
  process.env.NODE_ENV = mode;
  process.env.BABEL_ENV = mode;
  process.env.BROWSERSLIST_ENV = mode;

  const isDev = mode === 'development';
  const isServing = isDev && process.argv.includes('serve');

  const paths: Paths = {
    basedir: __dirname,
    // entry: {index: './src/index.tsx'},

    //src: './src',
    public: './public',
    indexHtmlTemplate: path.resolve('./public', 'index.html'),
    wasmCrate: path.join(__dirname, 'crates'),
    wasmOutDir: path.join(__dirname, 'src/api/pkg'),
    assets: './assets',
    favicon: './public/favicon.ico',
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

  const devServer: DevServerTypes.Configuration = {
    //contentBase: paths.output,
    allowedHosts: 'all',
    // host: '',
    port: process.env.PORT || 'auto',
    //compress: true,
    hot: true,
    //liveReload: true,
    //watchFiles: <DevServerTypes.WatchFiles>{
    //  paths: ['./src/**', './main/**', output.path],
    //  options: {
    //    ignored: ['**/node_modules', '**/target', '**/dist'],
    //  },
    //},
    // static: 'public', //default
    //onAfterSetupMiddleware: _ => {},
  };

  const cfg = configure(output, paths, {mode});
  cfg.node = {__dirname: false, __filename: false}; //global: false,
  // console.log(JSON.stringify(cfg.output));
  // output: {...cfg.output, filename: isDev ? '[name].js' : '[name].[contenthash:8].js'},
  //const renderer: Configuration = {...cfg, entry: {bundle: './src/index'}, target: 'electron-renderer'};
  const renderer: Configuration = {...cfg, entry: {bundle: './src/index'}};
  //const preload: Configuration = {...cfg, entry: {preload: './main/preload'}, target: 'electron-preload'};
  //const main: Configuration = {...cfg, entry: {index: './main/index'}, target: 'electron-main'};

  return [renderer];
  //return [isServing ? <WebpackOptionsNormalized>{...renderer, devServer} : renderer];
  //return [main, preload, isServing ? <WebpackOptionsNormalized>{...renderer, devServer} : renderer];
  //return [isServing ? <WebpackOptionsNormalized>{devServer, ...renderer} : renderer];
} // init
