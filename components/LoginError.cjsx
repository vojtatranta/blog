React = require 'react'
{Link} = require 'react-router'

module.exports = React.createClass

	render: ->
		<div className="loogin-error-wrap">
			<h2>Sorry, we have problem in our shitty code :(</h2>
			<p>You may try to go to <Link to="/login" className="link">login page</Link></p>
		</div>