const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, args) => {
	return {
		entry: './src/index.tsx',
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, '../dist'),
			clean: true
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.less', '.js'],
			plugins: [
				new TsconfigPathsPlugin({
				
				})
			]
		},
		module: {
			rules: [
				{
					test: /\.(tsx|ts)$/i,
					loader: 'ts-loader',
					exclude: env.prod ? /node_modules/ : undefined,
					options: {
						transpileOnly: !env.prod,
						allowTsInNodeModules: !env.prod,
						compilerOptions: {

						}
					}
				},
				{
					test: /\.less$/i,
					use: [
						env.prod ? {
							loader: MiniCssExtractPlugin.loader,
							options: {
								esModule: true,
							},
						} : 'style-loader',

						{
							loader: 'css-loader',
							options: {
								esModule: true,
							},
						},
						{
							loader: 'less-loader',
							options: {
								lessOptions: { javascriptEnabled: true },
							},
						}
					],
				}
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				// 源码为修改需要紧急中止客户端缓存时使用
				// hash: true,
				publicPath: '',
				templateParameters: {
					title: 'playground'
				},
				minify: env === 'prod' ? {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					keepClosingSlash: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
				} : undefined,
			}),

			new webpack.DefinePlugin({
				'process.env.APP': 'dev',
			}),
			
		]
	}
}