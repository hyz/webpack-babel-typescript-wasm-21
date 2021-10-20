/* eslint-disable node/no-unpublished-import */
import * as path from 'path';
import {ChildProcess} from 'child_process';

import type {Configuration} from 'webpack';
import type * as DevServerTypes from 'webpack-dev-server';
import WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';

import configure from './webpack.config';

(function dev() {
  const devServer: DevServerTypes.Configuration = {
    //context: paths.output,
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
    ///////////////
    // onAfterSetupMiddleware(_a) { console.log('||onAfterSetupMiddleware:', _a); },
    onListening(devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      const addr = devServer.server.address();
      console.log('||Listening on port:', addr);
    },
  };

  const cfgs: Configuration | ReadonlyArray<Configuration> = configure({}, {mode: 'development'});

  //const compiler = Webpack([main, preload, renderer]);
  const compiler = Webpack(cfgs); //([renderer] /*, (err, stats) => { console.log('||Webpack run & callback: ', err, stats); }*/);
  compiler.hooks.done.tap('Compile-Done', params => {
    console.log('||Done:', params);
  });

  const server = new WebpackDevServer(devServer, compiler);
  server.startCallback(() => {
    console.log('||WebpackDevServer.startCallback');
  });
})();
