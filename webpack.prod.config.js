const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      './src/index.jsx',
    ],
  },
  output: {
    path: `${__dirname}/static/`,
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!isomorphic-fetch',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new webpack.DefinePlugin({
      DEBUG: false,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-1', 'stage-2'],
        },
      },
      {
        test: /\.jpe?g$|\.gif$|\.png|\.woff2?|\.ttf|\.eot|\.svg$/,
        loader: 'url',
      },
      {
        test: /\.css$/,
        // NOTE: There is a bug in css-load to minimize calc(100% - xxx),
        // so we disalbe it with -minimize
        loader: 'style!css?-minimize&modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64:5]',
      },
    ],
  },
}
