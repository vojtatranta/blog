React = require 'react'
{ connect } = require 'react-redux'
routerActions = require '../actions/routerActions'


makeLoginURL = '/make-login'
module.exports = connect((-> {}), routerActions) React.createClass

	contextTypes:
		router: React.PropTypes.object

	handleLogin: (e) ->
		e.preventDefault()
		@props.resolveRedirect(makeLoginURL, @context.router)

	render: ->
		<div className="login-wrap">
			<div className="user-info">
			  <a className="button login-button" onClick={@handleLogin} href={makeLoginURL}>Login</a>
			</div>

			<div className="app-content login-screen">
			  <p>Start by logging in</p>
			  <a className="button login-button" onClick={@handleLogin} href={makeLoginURL}>Login</a>
			</div>
		</div>