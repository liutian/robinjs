const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = (env, args) => {
	return {
		mode: 'production',
		bail: true,
		devtool: 'hidden-source-map',
		output: {
			filename: '[name].[contenthash].bundle.js',
		},
		optimization: {
			minimizer: [
				new CssMinimizerPlugin(),
				'...'
			],
			splitChunks: {
				chunks: 'all',
				cacheGroups: {
					vendor: {
						test: /\/node_modules\//,
						name: 'vendors',
						chunks: 'all',
					},
				},
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].[contenthash].bundle.css',
				chunkFilename: '[id].[contenthash].bundle.css',
			}),
		],
	}
}