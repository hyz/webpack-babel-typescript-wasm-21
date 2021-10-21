/* eslint-disable node/no-unpublished-require */
/* eslint-disable node/no-unpublished-import */
import * as path from 'path';

import type {Configuration} from 'webpack';
import type * as DevServerTypes from 'webpack-dev-server';
import WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';

import configure from './webpack.config';

import {spawn} from 'child_process';
//import electron from 'electron';
const electron = require('electron');

const index = './main'; // ./dist

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

  const cfgs: ReadonlyArray<Configuration> = configure({}, {mode: 'development'});
  const compiler = Webpack(cfgs); //, (err, stats) => { console.log('||Webpack run & callback: ', err, stats); }
  const server = new WebpackDevServer(devServer, compiler);

  let doneCount = 0;
  compiler.hooks.done.tap('Compile-Done', params => {
    console.log('||Done:', doneCount, params);
    doneCount += 1;
    if (doneCount > 1) return;
    spawn(electron, [index], {stdio: 'inherit'}).on('close', () => {
      server.stopCallback(() => {
        console.log('||WebpackDevServer.stopCallback');
        // eslint-disable-next-line no-process-exit
        process.exit(0);
      });
    });
  });
  server.startCallback(() => {
    console.log('||WebpackDevServer.startCallback');
  });
})();
