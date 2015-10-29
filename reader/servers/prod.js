const path = require('path');
const express = require('express');
const proxyMiddleware = require('http-proxy-middleware');

var app = express();
var context = '/api';  

const api_location = process.env.MANIFOLD_API || 'http://manifold-api.dev'
const socket_location = process.env.NODE_SERVER_SOCKET_PATH

app.use(proxyMiddleware(['/api','/system/resources'], {
  target: api_location,
  changeOrigin: true
}));

// See http://stackoverflow.com/questions/7059518/setup-of-nginx-with-node-js
var oldUmask = process.umask(0000);
server = app.listen(socket_location, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Starting Manifold Reader...');
  console.log('  Environment is ' + process.env.NODE_ENV);
  console.log('  Listening at ' + socket_location);
  console.log('  Proxying API at ' + api_location);
  process.umask(oldUmask);
});


var gracefulShutdown = function() {
  console.log("Received kill signal, shutting down gracefully.");
  server.close(function() {
    console.log("Closed out remaining connections.");
    process.exit()
  });
  
   // if after 
   setTimeout(function() {
       console.error("Could not close connections in time, forcefully shutting down");
       process.exit()
  }, 10*1000);
}

// listen for TERM signal .e.g. kill 
process.on ('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on ('SIGINT', gracefulShutdown);