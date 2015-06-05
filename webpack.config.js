"use strict";

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
    path               = require('path');

module.exports = {
  resolveLoader: {
    root: [
      path.join(__dirname, "node_modules")
    ]
  },
  context: __dirname + '/app/lib/',
  entry: {
    'app': './app.js'
  },
  output: {
    path: path.join(__dirname),
    filename: '[name].js',
    chunkFilename: "[id].chunk.js"
  },
  plugins: [
    //new CommonsChunkPlugiddn("commons.js")
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      { test: /\.vue$/, loader: 'vue' }
    ]
  }
};
