const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	//线上环境建议不打包第三方库，使用cdn,可去掉注释
	// externals:{
	// 	vue: 'Vue'
	// },
	optimization: {
		minimize: true,
		runtimeChunk: {
			name: 'manifest'
		},
		splitChunks: {
			name: false,
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					name: 'common',
					maxInitialRequests: 5,
					minSize: 0
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	},
	performance: {
		hints: false
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash:5].css',
			chunkFilename: 'styles/[name].[contenthash:5].css'
		}),
		new HtmlWebpackPlugin({
			title: '江湖人称李老板',
			filename: 'index.html',
			template: resolve(__dirname, '../public/index.html'),
			minify: {
				minifyJS: true,
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			}
		}),
		new optimizeCssAssetsWebpackPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require("cssnano"),
			cssProcessorPluginOptions: {
				preset: [
					'default',
					{
						discardComments: {
							removeAll: true
						}
					}
				]
			},
			canPrint: true
		})
	]
};