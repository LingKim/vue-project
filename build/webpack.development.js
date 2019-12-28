const { resolve,join } = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Jarvis = require('webpack-jarvis');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
	devtool: "eval-source-map",
	devServer: {
		host: 'localhost',
		contentBase:join(__dirname,'../dist'),
		compress: true,
		publicPath: '/',
		hot:true,
		overlay: true,
		quiet: true,
		historyApiFallback:true
	},
	plugins: [
		new Jarvis({ port:1337 }),
		new HtmlWebpackPlugin({
			title: "江湖人称李老板",
			filename: "index.html",
			template: resolve(__dirname, '../public/index.html')
		}),
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: ['You application is running here http://localhost:8080'],
				notes: ['webpack编译完成,可以访问了']
			},
			onErrors: function (severity, errors) {
				// You can listen to errors transformed and prioritized by the plugin
				// severity can be 'error' or 'warning'
			},
			clearConsole: true
		}),
		new WebpackBuildNotifierPlugin({
			title: "webpack构建完成",
			suppressSuccess: true
		})
	]
};


