React = require 'react'
{PROD, port} = require '../config'

###*
	TODO: Use webpack for everything
###
module.exports = React.createClass
	
	render: ->
		bundlePath = if PROD then '/static/bundle.js' else '//localhost:3000/static/bundle.js'
		<html>
			<head>
				<title>Pruben app</title>
				<meta name="viewport" content="width=device-width,initial-scale=1"/>
				{<link rel="stylesheet" type="text/css" href="/static/style.css"/> if PROD}
			</head>
			<body>
				<div id="root" dangerouslySetInnerHTML={__html: @props.BODY} />
			</body>
			<script dangerouslySetInnerHTML={__html: @props.STATE}/>
  			<script async src={bundlePath}></script>
		</html>