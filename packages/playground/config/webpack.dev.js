// const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const proxyMap = require('./proxy');

module.exports = (env, args) => {
  return {
    mode: "development",
    output: {
    },
    devtool: 'inline-source-map',
    cache: {
      type: 'filesystem',
    },
    devServer: {
      clientLogLevel: 'warning',
      contentBase: './dist',
      historyApiFallback: true,
      open: true,
      port: 8888,
      proxy: proxyMap[env.APP_ENV],
      hot: true
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({

      }),
    ],
  }
}