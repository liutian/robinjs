// const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = {
  mode: "development",
  output: {
  },
	devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning',
		contentBase: './dist',
    historyApiFallback: true,
    open: true,
    port: 8888,
	},
  plugins: [
    new ForkTsCheckerWebpackPlugin({

    }),
  ],
}