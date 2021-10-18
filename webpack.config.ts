import * as path from 'path';
import configure from './configs/webpack';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (env: any, opts: {mode: 'production' | 'development'}) {
  console.log(JSON.stringify(env), __filename);
  process.env.NODE_ENV = opts.mode;
  process.env.BABEL_ENV = opts.mode;
  process.env.BROWSERSLIST_ENV = opts.mode;

  const paths = {
    output: path.resolve(__dirname, 'dist'),
    src: './src',
    public: './public',
    index: './src/index.tsx',
    indexHtmlTemplate: path.resolve('./public', 'index.html'),
    wasmCrate: path.join(__dirname, 'crates'),
    wasmOutDir: path.join(__dirname, 'src/api/pkg'),
    assets: './assets',
    favicon: './public/favicon.ico',
  };

  //const devServe = isDev && process.argv.includes('serve');

  const cfg = configure(paths, opts);
  console.log(JSON.stringify(cfg.output));
  return cfg;
}
