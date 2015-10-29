var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index.jsx'
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
  },
  devtool: "#inline-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

