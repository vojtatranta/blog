require 'babel/register'
require('node-jsx').install extension: '.jsx', harmony: true
require('coffee-react/register')
initialData = require './data/initial'
request = require 'superagent'
Promise = require 'promise'
Root = require './containers/Root'
React = require 'react'
HTML = require './components/html'
{Router} = require 'react-router'
Location = require 'react-router/lib/Location'
routes = require './routes'
favicon = require 'serve-favicon'
{dateFormat, simpleRequest, merge} = require './helpers/utils'
bodyParser = require 'body-parser'
express = require 'express'
tasksHelper = require './helpers/tasks'

config = require './configLocal'

{PROD} = config

AV_USER_COOKIE = 'av_user'
TOKEN_COOKIE = 'av_token'

app = express()

app.use bodyParser.urlencoded(extended: false)
app.use bodyParser.json()
app.use bodyParser.text()
app.use favicon(__dirname + '/public/favicon.ico')
app.use require('cookie-parser')()
app.use require('express-session')(secret: 'superior app')
app.use require('compression')()
app.use '/static', express.static(__dirname + '/dist/generated')

# Fucking XHR, ti follows redirects by default
jsRedirect = (req, res, to) ->
	if wantsJSON(req)
		res.json({'location': to})
	else
		res.redirect(to)

# Not brilliant
wantsJSON = (req) ->
	req.headers.accept.search('application/json') > -1

getToken = ->
	errMsg = "Could not get token"
	new Promise (resolve, reject) ->
		simpleRequest('get', tasksHelper.getLoginURL(config.API_KEY))
		.then(
			((result) ->
				resolve(result)
			), ((err) ->
				reject(errMsg)
			)
		).catch (err) -> reject(errMsg)

getTasks = (token) ->
	new Promise (resolve, reject) ->
		simpleRequest('get', tasksHelper.getTasksURL(config.API_KEY, token))
		.then(
			((result) ->
				if result.tasks? then resolve(result.tasks) else reject('Cannot find key "tasks"', result)
			), 
			((err) -> reject(err))
		).catch (err, status) ->
			console.log err, status.statusCode

getData = (initialData, token, additionalData) ->
	new Promise (resolve, reject) ->
		getTasks(token)
		.then(
			((result) ->
				initialData.tasks = result
				initialData.token = token
				resolve(merge(initialData, additionalData))
			), ((err, status) -> throw new Error(err))
		).catch (err) ->
			reject(err)

renderReact = (initialData, routerState, cb) ->
	markup = React.renderToString(React.createElement(Root(initialData, routerState), initialData))
	cb('<!doctype html>' + React.renderToStaticMarkup(React.createElement(HTML, BODY: markup, STATE: "window.initial = #{JSON.stringify(initialData)}")))

setCookie = (key, value, res, age = null) ->
	res.cookie(key, value, path: '/', httpOnly: true, maxAge: if age then age else 60 * 60 * 24 * 2)

sendHTMLOrJSON = (req, res, data, routerState) ->
	if wantsJSON(req)
		res.json data
	else
		renderReact data, routerState, (markup) -> res.send markup

sendResponse = (initialData, req, res) ->
	location = new Location req.path, req.query
	Router.run routes, location, (err, routerState) ->
		sendHTMLOrJSON req, res, initialData, routerState

sendState = (token, additionalData, req, res) ->
	getData(initialData, token, additionalData).then(
		((data) ->
			sendResponse(data, req, res)
		), ((err, status) ->
			# log it
			jsRedirect(req, res, '/login-error')
		)
	)
	.catch (err) ->
		# log it
		jsRedirect(req, res, '/login-error')

app.get '/', (req, res) ->
	if not req.cookies[TOKEN_COOKIE]?
		jsRedirect(req, res, '/login')
	else 
		sendState(req.cookies[TOKEN_COOKIE], user: JSON.parse(req.cookies[AV_USER_COOKIE]), req, res)

app.get '/login', (req, res) ->
	sendResponse(initialData, req, res)

app.get '/login-error', (req, res) ->
	sendResponse(initialData, req, res)

app.get '/make-login', (req, res) ->
	getToken().then(
		((result) ->
			setCookie(TOKEN_COOKIE, result.token, res, result.user.expires_at)
			setCookie(AV_USER_COOKIE, JSON.stringify(result.user), res, result.user.expires_at)
			jsRedirect(req, res, '/')
		), ((err) ->
			# log it
			jsRedirect(req, res, '/login-error')
		)
	)

app.listen config.port, -> console.log "App server is listening on port #{config.port}"