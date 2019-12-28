const webpack = require('webpack');
const {join, resolve} = require('path');
const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const isDev = _mode === 'development';
const _mergeConfig = require(`./build/webpack.${_mode}.js`);
const env = require('./build/env.js')[_mode];
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const progressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssLoaders = require('./build/cssLoader.js');
const baseCssLoaders = isDev ? ['vue-style-loader'] : [MiniCssExtractPlugin.loader];

// console.log(process.argv);
// console.log(process.argv.slice(2));
// console.log(argv.env);


const baseConfig = {
	entry: {
		app: join(__dirname, './src/main.js')
	},
	output: {
		filename: isDev ? 'scripts/[name].js' : 'scripts/[name].[chunkhash:5].js',
		path: join(__dirname, 'dist'),
		publicPath: env.publicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@pages': resolve(__dirname, './src/pages'),
			'@component': resolve(__dirname, './src/component'),
			'@common': resolve(__dirname, './src/common'),
			'@assets': resolve(__dirname, './src/assets'),
		},
		modules: [resolve('src'), 'node_modules']
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: '/node_modules/',
				include: resolve('./src'),
				loader: ['cache-loader','vue-loader']
			},
			{
				test: '/\.js$/',
				exclude: '/node_modules/',
				include: resolve('./src'),
				use: ['cache-loader', 'babel-loader']
			},
			{
				test: /\.less$/,
				use: [
					...baseCssLoaders,
					...cssLoaders
				]
			},
			{
				test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10 * 1024,
						name: isDev ? 'images/[name].[ext]' : 'images/[name].[hash:5].[ext]',
						publicPath: env.publicPath
					}
				}
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new progressBarPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(_mode),
			'process.env.baseUrl':JSON.stringify(env.publicPath),
			'process.env.Api_ENV':JSON.stringify(argv.env)
		})
	]
};

module.exports = merge(_mergeConfig, baseConfig);