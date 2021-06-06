module.exports = () => {
	return {
		mode: "production",
		output: {
			filename: '[name].[contenthash].bundle.js',
		},
		optimization: {
			runtimeChunk: 'single',
			moduleIds: 'deterministic',
			splitChunks: {
				splitChunks: {
					styles: {
						type: 'css/mini-extract', 
						chunks: 'all',
					},
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					}
				}
			}
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "[name].css",
				chunkFilename: "[id].css",
			}),
		],
	}
}