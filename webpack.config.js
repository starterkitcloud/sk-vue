var path = require('path');
var webpack = require('webpack');
require('babel-polyfill');

module.exports = {
	entry: ['babel-polyfill', './src/main.js'],
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'build.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				],
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				],
			},
			{
				test: /\.sass$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader?indentedSyntax'
				],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this necessary.
						'scss': [
							'vue-style-loader',
							'css-loader',
							'sass-loader'
						],
						'sass': [
							'vue-style-loader',
							'css-loader',
							'sass-loader?indentedSyntax'
						]
					}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		overlay: true
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map'
};



if (process.env.NODE_ENV === 'development') {
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"',
				API_URI: '"http://localhost:8000/"',
				API_CLIENT_ID: '"developmentapplication"'
			}
		}),
	]);
}

// if (process.env.NODE_ENV === 'staging') {
// 	module.exports.plugins = (module.exports.plugins || []).concat([
// 		new webpack.DefinePlugin({
// 			'process.env': {
// 				NODE_ENV: '"test"',
// 				API_URL: '"http://api-stage.nodeline.com/"',
// 				API_CLIENT_ID: 'ie5jdlg4MjCrHSHVYtHjNN8chkMvPRoNxIxFEoAr'
// 			}
// 		}),
// 	]);
// }

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map';
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
				API_URI: '"http://api-stage.nodeline.com/"',
				API_CLIENT_ID: '"2tE4TFbcXW9vFfkCUPI1XiEs3t4EJxJFVpg6LSQc"',
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: true
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);
}
