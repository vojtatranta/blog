webpack = require 'webpack'
WebpackDevServer = require 'webpack-dev-server'
config = require './webpack.config'

port = 3000

new WebpackDevServer webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true
	}
}
.listen port, 'localhost', (err) ->
  console.log err if err
  console.log "Listening at localhost:#{port}"
