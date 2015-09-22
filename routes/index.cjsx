React = require 'react'
{Route} = require 'react-router'
Tasks = require '../components/Tasks'
Login = require '../components/Login'
App = require '../components/App'
LoginError = require '../components/LoginError'

module.exports = 
	<Route component={App}>
		<Route component={Tasks} path="/" />
		<Route component={Login} path="/login" />
		<Route component={LoginError} path="/login-error" />
	</Route>