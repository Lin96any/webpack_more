const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const HtmlWk = require('html-webpack-plugin')
const { ProvidePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const configs = {
	entry: {
		index: resolve('./src/js/index.js'),
		caption: resolve('./src/js/caption.js')
	},
	module: {
		rules: [
			{
				test: /\.(css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader"
				]
			},
			{
				test: /\.(scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 2
						}
					},
					"sass-loader",
					"postcss-loader"
				]
			},
			{
				test: /\.(ttf|woff|woff2|svg|eot)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: "font/"
					}
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name]_[hash:8].[ext]',
						limit: 10240,
						outputPath: "images/"
					}
				}
			}
		]
	},
	optimization: {
		usedExports: true,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					filename: 'js/vendors.js',
					priority: -10
				},
				default: {
					filename: 'js/common.js',
					priority: -20
				}
			}
		}
	},
	output: {
		filename: 'js/[name]_[hash].js',
		path: resolve('./dist')
	}
}

const plugins = [
	new ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
		jquery: 'jquery',
		"window.jquery": 'jquery',
		Tether: "tether",
		"window.Tether": "tether",
		Popper: ['popper.js', 'default'],
		Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
		Button: "exports-loader?Button!bootstrap/js/dist/button",
		Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
		Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
		Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
		Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
		Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
		Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
		Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
		Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
		Util: "exports-loader?Util!bootstrap/js/dist/util",
	}),
	new CleanWebpackPlugin(),
	new MiniCssExtractPlugin({
		filename: 'css/[name].css'
	})
]

const MekPlugins = configs =>{
	const entry = configs.entry;
	Object.keys(entry).forEach(item=>{
		plugins.push(
			new HtmlWk({
				template: resolve('src/views/index.html'),
				favicon: resolve('public/favicon.ico'),
				filename:`${item}.html`,
				chunks: ['vendors','common',item]
			})	
		)
	})
	return plugins
}

configs.plugins = MekPlugins(configs)

module.exports = configs