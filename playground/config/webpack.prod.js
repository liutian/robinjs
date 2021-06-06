const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, args) => {
	return {
		mode: 'production',
		devtool: 'hidden-source-map',
		output: {
			filename: '[name].[contenthash].bundle.js',
		},
		optimization: {
			minimize: true,
			splitChunks: {
				chunks: 'all',
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].[contenthash].bundle.css',
				chunkFilename: '[name].[contenthash].bundle.css',
			}),
		],
	}
}