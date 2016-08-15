const path = require('path')
const webpack = require('webpack')

const str = val => JSON.stringify(val)
const NODE_ENV = process.env.NODE_ENV || 'development'
const env = {
  prod: NODE_ENV === 'production',
  dev: NODE_ENV === 'development',
}
console.log(NODE_ENV)

module.exports = {
  debug: !env.prod,
  devtool: !env.prod ? 'eval-source-map' : false,
  entry: !env.dev ?
    './client/index.js' :
    [
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './client/index.js',
    ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        API_HOST: str(process.env.API_HOST),
        NODE_ENV: str(process.env.NODE_ENV),
      },
      __BROWSER__: str(true),
      __DEV__: str(env.dev),
    }),
  ].concat(!env.prod ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        drop_console: true,
        warnings: false,
      },
    }),
  ]),
}
