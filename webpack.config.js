const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: '[name]-boudle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [{
        test: /\.js/, //babel转化es6到es5
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }]
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true,
      historyApiFallback: true,
      compress: true
    },
    // plugins: {
    //   HotModuleReplacementPlugin: new webpack.HotModuleReplacementPlugin()
    // },
    mode: 'development'
};