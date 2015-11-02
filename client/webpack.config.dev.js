var webpack = require('webpack');
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'reader': ['webpack-hot-middleware/client', 'reader/index.jsx'],
    'backend': ['webpack-hot-middleware/client', 'backend/index.jsx'],
    'frontend': ['webpack-hot-middleware/client', 'frontend/index.jsx']
  },
  module: {
    loaders: [
      {
        test: /(\.js$|\.jsx$)/,
        exclude: /node_modules/,
        //loaders: ['babel','eslint-loader']
        loaders: ['babel']
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
    path: __dirname + '/dist/static',
    publicPath: '/static',
    filename: "[name]-[hash].js"
  },
  devtool: "#inline-source-map",
  plugins: [
    new StatsWriterPlugin({
      filename: "stats.json" // Default
    }),
    new HtmlWebpackPlugin({
      chunks: ['reader'],
      filename: 'reader.html',
      title: 'Manifold Reader',
      template: 'src/skin/templates/index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['backend'],
      filename: 'backend.html',
      title: 'Manifold Backend',
      template: 'src/skin/templates/index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['frontend'],
      filename: 'frontend.html',
      title: 'Manifold Frontend',
      template: 'src/skin/templates/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

