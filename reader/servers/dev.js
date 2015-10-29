const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.dev');
const proxyMiddleware = require('http-proxy-middleware');

var app = express();
var compiler = webpack(config);
var context = '/api';  

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

const api_location = process.env.MANIFOLD_API || 'http://manifold-api.dev'
console.log()
app.use(proxyMiddleware(['/api','/system/resources'], {
	target: api_location,
	changeOrigin: true
}));


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(3000, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Manifold Reader is awaiting requests at http://localhost:3000');
  console.log('');
  console.log('We are using the API at ' + api_location);

});