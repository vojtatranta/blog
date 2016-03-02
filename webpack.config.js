var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PROD = process.env.NODE_ENV == 'production'

module.exports = {
  devtool: PROD ? '' : 'cheap-module-eval-source-map',
  entry: PROD ? './index' : [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist', 'generated'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/static/'
  },
  plugins: PROD ?
    [
      new ExtractTextPlugin('style.css', {allChunks: true}),
      new webpack.optimize.UglifyJsPlugin({minimize: true, comments: false})
    ] :
    [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.cjsx', '.coffee']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: PROD ? ['babel'] : ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, '..', '..', 'src')
    },
    {
      test: /\.css$/,
      loader: PROD ? ExtractTextPlugin.extract('style-loader', 'css-loader?minimize&modules&importLoaders=1&localIdentName=[name]__[local]!sass-loader!autoprefixer-loader?browsers=last 2 version') :
      'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]!sass-loader!autoprefixer-loader?browsers=last 2 version'
    },
    {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'url?limit=25000',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }]
  }
};
