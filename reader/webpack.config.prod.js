var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.jsx',
    './src/index.html',
  ],
  module: {
    loaders: [
      {
        test: /(\.js$|\.jsx$)/, 
        exclude: /node_modules/,
        loaders: ['babel','eslint-loader']
      }, 
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ["node_modules", "src"]
  },
  eslint: {  
    configFile: '.eslintrc'
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  }
};
