/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */
import * as path from 'path';

const base = path.resolve(__dirname, '..');
export const paths = {
  base,
  src: path.join(base, 'src'),
};

/**
 * Client-side application settings for the local development environment.
 */
export const config = {
  // Core application settings
  app: {
    name: 'React App',
    origin: 'http://localhost:3000',
    env: 'local' as 'local' | 'test' | 'prod',
  },
  // GraphQL API and OAuth endpoint(s)
  // https://github.com/kriasoft/node-starter-kit
  api: {
    origin: 'https://us-central1-kriasoft.cloudfunctions.net',
    prefix: '/reactstarter', // Cloud Function URL pathname
    path: '/api',
  },
  // Firebase / Firestore (optional)
  // https://firebase.google.com/docs/firestore
  firebase: {
    authKey: 'xxxxx',
    authDomain: 'https://example.firebaseapp.com',
    projectId: 'example',
  },
};

/**
 * Client-side application settings for the test / QA environment.
 */
export const dev: typeof config = {
  app: {
    ...config.app,
    origin: 'https://test.example.com',
    env: 'test',
  },
  api: {
    ...config.api,
    origin: 'https://us-central1.example-test.cloudfunctions.net',
  },
  firebase: {
    authKey: 'xxxxx',
    authDomain: 'https://example-test.firebaseapp.com',
    projectId: 'example-test',
  },
};

/**
 * Client-side application settings for the production environment.
 */
export const prod: typeof config = {
  app: {
    ...config.app,
    origin: 'https://example.com',
    env: 'prod',
  },
  api: {
    ...config.api,
    origin: 'https://us-central1.example.cloudfunctions.net',
  },
  firebase: {
    authKey: 'xxxxx',
    authDomain: 'https://example.firebaseapp.com',
    projectId: 'example',
  },
};

export type Config = typeof config;
//export default {dev, prod};
