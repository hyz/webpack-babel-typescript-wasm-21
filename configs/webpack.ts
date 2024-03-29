/* eslint-disable node/no-unpublished-require */
/* eslint-disable node/no-unpublished-import */
import type {Configuration, EntryObject, ResolveOptions, RuleSetUseItem} from 'webpack';
import webpack from 'webpack';
//import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import type {Manifest} from 'webpack-manifest-plugin';
import {WebpackManifestPlugin} from 'webpack-manifest-plugin';

import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';

import {CleanWebpackPlugin} from 'clean-webpack-plugin'; // tree shaking
import CopyPlugin from 'copy-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import HtmlWebpackPlugin from 'html-webpack-plugin';
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
//import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin';
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');
//import InlineChunkHtmlPlugin from 'inline-chunk-html-plugin';

const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer'); // help tailwindcss to work
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

import CompressionPlugin from 'compression-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
//import ReactRefreshTypeScript from 'react-refresh-typescript';

//require('@babel/register')({extensions: ['.ts'], cache: false});
//import * as constants from './constants';

export interface WasmPackPluginOptions {
  crateDirectory: string;
  args?: string;
  extraArgs?: string;
  forceWatch?: boolean;
  forceMode?: 'development' | 'production';
  outDir?: string;
  outName?: string;
  watchDirectories?: string[];
  /** Controls plugin output verbosity. Defaults to 'info'. */
  pluginLogLevel?: 'info' | 'error';
}
export interface CustomConfigs {
  //basedir: string;
  //public: string;
  //assets: string;
  htmlWebpackPluginOptions: HtmlWebpackPlugin.Options;
  wasmPackPluginOptions: WasmPackPluginOptions; // wasmCrate: string; wasmOutDir: string;
  plugins: webpack.WebpackPluginInstance[];
}
export type Options = {mode: 'production' | 'development'};
export type Output = NonNullable<Configuration['output']>;

export function configure(output: Output, cfgs: CustomConfigs, opts: Options): Configuration {
  //, entry: EntryObject
  console.log(JSON.stringify(cfgs));
  //console.log(JSON.stringify(process.argv));

  const isDev = opts.mode === 'development';
  //const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile');
  //const _config = env.prod ? configs.prod : env.test ? configs.test : configs.local;
  const isProd = !isDev; //process.env.NODE_ENV === 'production';

  //const babelLoader: RuleSetUseItem = {
  //  loader: 'babel-loader',
  //  options: {
  //    presets: ['@babel/env', '@babel/typescript', '@babel/react'],
  //    plugins: [
  //      '@babel/plugin-proposal-class-properties',
  //      '@babel/plugin-syntax-dynamic-import',
  //      '@babel/plugin-transform-runtime',
  //    ],
  //  },
  //};

  //const terserPlugin = new TerserPlugin({
  //  terserOptions: {
  //    parse: {ecma: 2018},
  //    compress: {
  //      ecma: 5,
  //      //warnings: false,
  //      comparisons: false,
  //      inline: 2,
  //    },
  //    mangle: {safari10: true},
  //    keep_classnames: isProduction,
  //    keep_fnames: isProduction,
  //    output: {ecma: 5, comments: false, ascii_only: true},
  //  },
  //});

  //const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({
  //  cssProcessorOptions: {
  //    map: {inline: false},
  //  },
  //});

  //const cssLoader = <RuleSetUseItem>{
  //  loader: 'css-loader',
  //  options: {
  //    sourceMap: isDev,
  //    modules: {
  //      auto: true,
  //      localIdentName: isDev ? '[name]_[local]_[contenthash:8]' : '[hash:base64]',
  //    },
  //  },
  //};

  const config: Configuration = {
    mode: opts.mode,
    node: {global: false, __dirname: false, __filename: false},

    output: {
      //clean: true,
      compareBeforeEmit: false,
      // filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
      // chunkFilename: isDev ? '[name].js' : '[name].[contenthash:8].chunk.js',
      // assetModuleFilename: 'assets/[hash][ext][query]',
      // //webassemblyModuleFilename: '[hash:8].wasm',
      // // library: '',
      // // libraryTarget: 'es5',
      // crossOriginLoading: 'anonymous',
      ...output,
    },

    // Fail out on the first error instead of tolerating it.
    bail: !isDev,
    // This option controls if and how source maps are generated.
    devtool: isDev ? 'eval-source-map' : 'source-map',

    optimization: {
      minimize: isProd,
      minimizer: [new HtmlMinimizerPlugin(), new CssMinimizerPlugin(), new TerserPlugin()],
      //chunkIds: 'deterministic', // To keep filename consistent between different modes (for example building only)
      //splitChunks: {chunks: 'all'},
      //runtimeChunk: {name: (entrypoint: any) => `runtime-${entrypoint.name}`},
      //checkWasmTypes: true,
    },

    module: {
      strictExportPresence: true,

      rules: [
        {
          exclude: /(\.d\.ts)$/,
        },
        {
          test: /\.worker\.[tj]s$/,
          use: 'worker-loader',
        },
        //{
        //  //{ test: /\.wasm$/, type: 'javascript/auto', use: { loader: 'file-loader', }, },
        //  test: /\.wasm$/,  type: 'webassembly/sync',
        //},
        {
          test: /\.(js|ts|jsx|tsx|cjs|mjs)$/,
          exclude: /node_modules/,
          loader: 'babel-loader', //['babel-loader', 'ts-loader'],
          //options: {rootMode: 'upward'},
          //options: { plugins: [isDev && 'react-refresh/babel'].filter(Boolean), },
        },
        // mergeLoaderOptions('ts-loader', {
        //   getCustomTransformers: () => ({
        //     before: [ReactRefreshTypeScript()],
        //   }),
        //   transpileOnly: true,
        // });
        {
          test: /\.css$/,
          use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(sass|scss)$/,
          use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.less$/,
          use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
        },
        //{
        //  test: /\.css$/,
        //  use: [
        //    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        //    cssLoader, //{ loader: 'css-loader', options: { sourceMap: isDev, }, },
        //  ],
        //},
        {
          test: /\.(jpeg|jpg|png|gif|webp)$/,
          type: 'asset', //'asset/inline', //'asset/resource',
          parser: {
            dataUrlCondition: {maxSize: 8 * 1024},
          },
          //loader: 'url-loader', options: {limit: 10 * 1024},
        },
        {test: /\.json$/, type: 'asset/inline'},
        {
          test: /\.svg$/,
          type: 'asset',
          //exclude: /node_modules/,
          //use: [
          //  <RuleSetUseItem>{
          //    loader: 'svg-url-loader',
          //    options: {limit: 10 * 1024, noquotes: true},
          //  },
          //  <RuleSetUseItem>{
          //    loader: 'svgo-loader',
          //    options: {
          //      plugins: [{removeTitle: true}, {mergePaths: true}],
          //      multipass: true,
          //    },
          //  },
          //],
        },
        {
          test: /\.(glsl|vert|frag)$/,
          exclude: /node_modules/,
          use: <RuleSetUseItem>{
            loader: 'webpack-glsl-minify',
            options: {
              // Don't obfuscate shader code in dev mode
              disableMangle: !isProd,
              preserveAll: !isProd,
              esModule: true,
            },
          },
        },
        {test: /\.(woff|woff2|eot|ttf|otf)$/, type: 'asset'},
        //{test: /\.(py|js|ts|rs)$/, exclude: /(src|configs)/, type: 'asset/source'},
      ],
    },
    //experiments: {
    //  //syncWebAssembly: true,
    //  //asyncWebAssembly: true,
    //  //topLevelAwait: true,
    //  //importAwait: true,
    //},

    plugins: [
      // Pass environment variables that are used in the code.
      new webpack.EnvironmentPlugin(Object.keys(process.env)),
      // Show progress when it's a production mode.
      !isDev && new webpack.ProgressPlugin(),

      new WasmPackPlugin({
        //crateDirectory: paths.wasmCrate, //__dirname,
        outName: 'index',
        extraArgs: '--target web', //'--target web --mode normal',
        forceMode: opts.mode,
        ...cfgs.wasmPackPluginOptions,
      }),

      // // Copy content to the output directory without processing it.
      // new CopyPlugin({
      //   patterns: [
      //     {
      //       from: cfgs.public,
      //       to: output.path,
      //       globOptions: {ignore: ['**/index.html']},
      //       noErrorOnMissing: true,
      //     },
      //   ],
      // }),

      // Add scripts to the final HTML
      new HtmlWebpackPlugin({
        inject: true,
        minify: isProd
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : undefined,
        ...cfgs.htmlWebpackPluginOptions,
        //template: `html-loader!${paths.indexHtmlTemplate}`,
        //filename: 'index.html',
        //favicon: paths.favicon,
      }),
      !isDev && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),

      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file.
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
        generate: (seed, files) => {
          const manifest: Manifest = {};
          files.forEach(file => {
            manifest[file.name] = file.path;
          });
          return manifest;
        },
      }),

      isDev && new ReactRefreshWebpackPlugin(),
      // Updates modules while an application is running, without a full reload.
      //isDev && new webpack.HotModuleReplacementPlugin(),

      isProd &&
        new CompressionPlugin({
          test: /\.(js|css|html|ttf|svg|woff|woff2|eot|json)$/,
          //!!! filename: '[path].br[query]', //! Conflict: Multiple assets
          //filename: '[path][base].br', // * @default '[path][base].gz'
          //algorithm: 'brotliCompress', // default gzip
          compressionOptions: {level: 9},
        }),

      isProd &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[id].[contenthash].css',
          ignoreOrder: true,
        }),

      ...cfgs.plugins,
    ].filter(Boolean),

    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx'], // , '.glsl', '.vert', '.frag'],
      //alias: tsconfig.compilerOptions.paths as {[index: string]: string[]};
      alias: {}, // {src: (paths.src), assets: (paths.assets)},
      plugins: [new TsconfigPathsPlugin()],
    } as ResolveOptions,
  };

  //import('../tsconfig.json').then(tsconfig => {
  //  const resolve = config.resolve as webpack.ResolveOptions;
  //  resolve.alias = tsconfig.compilerOptions.paths as {[index: string]: string[]};
  //});
  //console.log(`config.resolve: ${JSON.stringify(config.resolve)}`);

  //console.log(JSON.stringify(config.output));
  return config; //{...devServer, ...config};
}

//function configure(env: any, options: any): Configuration | {devServer?: devServer.Configuration} { return config; }
//export default function (env: any, options: any) /*: Configuration & typeof dev*/ { return {...dev, ...configure(env, options)}; }
