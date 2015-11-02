"use strict";
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.dev');
const colors = require('colors');
const emoji = require('node-emoji').emoji;
const proxy = require('http-proxy-middleware');
const morgan = require('morgan');
const developmentRouter = require('./routers/development');
const productionRouter = require('./routers/production');

const bootstrap = () => {

  const compiler = webpack(config);
  const environment = process.env.NODE_ENV;
  const apiUri = process.env.MANIFOLD_API;
  const apiProxyPaths = ['/api','/system/resources'];
  const listenPort = process.env.MANIFOLD_CLIENT_PORT;
  const listenIP = process.env.MANIFOLD_CLIENT_IP;
  const server = express();
  let logger;
  let router;
  let useDevMiddleware;

  if(environment == 'production') {
    logger = morgan('combined');
    router = productionRouter;
    useDevMiddleware = false;
  } else {
    logger = morgan('dev');
    router = developmentRouter;
    useDevMiddleware = true;
  }

  console.log(`--------------------------------------------------------------------------------`.white.bold);
  console.log(`${emoji.evergreen_tree}  ${'THE ENVIRONMENT'.white.bold}`);
  console.log(`--------------------------------------------------------------------------------`.white.bold);
  console.log(`${'NODE_ENV'.bold}: ${environment}`.yellow);
  console.log(`${'MANIFOLD_API'.bold}: ${apiUri}`.yellow);
  console.log(`${'MANIFOLD_CLIENT_PORT'.bold}: ${listenPort}`.yellow);
  console.log(`${'MANIFOLD_CLIENT_IP'.bold}: ${listenIP}`.yellow);
  console.log('');

  server.use(logger)
  server.use('/', router);

  // In development, we proxy the API, use dev and hot webpack middlware
  if(useDevMiddleware == true) {

    console.log(`--------------------------------------------------------------------------------`.white.bold);
    console.log(`${emoji.vertical_traffic_light}  ${'PROXIED PATHS'.white.bold}`);
    console.log(`--------------------------------------------------------------------------------`.white.bold);

    // Proxy the API to avoid CORS issues in development
    server.use(proxy(apiProxyPaths, {
      target: apiUri,
      changeOrigin: true
    }));

    // Log the paths we're proxying
    apiProxyPaths.forEach(function (value) {
      console.log(`${value} > ${apiUri}${value}`);
    });

    // Apply webpack dev middleware
    server.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    }));

    // Apply webpack hot middleware
    server.use(require('webpack-hot-middleware')(compiler));
  }
  // End development middleware

  // Start the server
  server.listen(listenPort, listenIP, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('');
    console.log(`--------------------------------------------------------------------------------`.white.bold);
    console.log(`${emoji.books}  STARTING MANIFOLD`);
    console.log(`--------------------------------------------------------------------------------`.white.bold);
    console.log(`Manifold Client is listening at http://${listenIP}:${listenPort}`.green);
    console.log('');
    console.log(`--------------------------------------------------------------------------------`.white.bold);
    console.log(`${emoji.page_with_curl}  LOG OUTPUT`.white.bold);
    console.log(`--------------------------------------------------------------------------------`.white.bold);
  });
}

module.exports.start = bootstrap;

