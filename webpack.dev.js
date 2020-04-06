
const merge = require('webpack-merge')
const common = require('./webpack.common')
const { HotModuleReplacementPlugin } = require('webpack')
const dev = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new HotModuleReplacementPlugin()
	],
	devServer:{
		contentBase:'./dist',
		open:true,
		hot:true,
		hotOnly:true
	}
}

module.exports = merge(common,dev)