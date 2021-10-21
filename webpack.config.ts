import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import * as path from 'path';
//import merge from 'webpack-merge';

import type {Configuration, EntryObject} from 'webpack';
import {SubresourceIntegrityPlugin} from 'webpack-subresource-integrity';
import type {CustomConfigs} from './configs/webpack';
import {configure} from './configs/webpack';

export default function (env: unknown, {mode}: {mode: 'production' | 'development'}): Configuration[] {
  //console.log(JSON.stringify(env), __filename);
  process.env.NODE_ENV = mode;
  process.env.BABEL_ENV = mode;
  process.env.BROWSERSLIST_ENV = mode;
  const isDev = mode === 'development';
  // const isProd = mode === 'production';

  const cfgs: CustomConfigs = {
    //basedir: __dirname,
    //public: './public',
    //assets: './assets',

    htmlWebpackPluginOptions: {
      title: 'Hello world.',
      template: `html-loader!${path.resolve('./public', 'index.html')}`,
      favicon: './public/favicon.ico',
      filename: 'index.html',
      //templateParameters: { PUBLIC_URL: paths.public, }, // test, nonsense
    },
    wasmPackPluginOptions: {
      crateDirectory: path.join(__dirname, 'crates'),
      outDir: path.join(__dirname, 'src/api/pkg'),
      outName: 'index',
      extraArgs: '--target web', //'--target web --mode normal',
    },
    plugins: [new CleanWebpackPlugin()],
  };
  isDev || cfgs.plugins.push(new SubresourceIntegrityPlugin());

  //const entry: EntryObject = { index: './main/index', preload: './main/preload', renderer: './src/index.tsx', };
  //cfgs.plugins .push (
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

  const cf = configure(output, cfgs, {mode});
  // console.log(JSON.stringify(cf.output));

  const renderer = {name: 'renderer', entry: './src/index'/*, target: 'electron-renderer'*/};
  //const preload = {name: 'preload', entry: {preload: './main/preload'}, target: 'electron-preload'};
  //const main = {name: 'main', entry: {index: './main/index'}, target: 'electron-main'};
  return [
    {...cf, ...renderer}, //{...cf, ...main}, {...cf, ...preload},
  ];
} // configure
