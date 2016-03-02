import cssModulesRequireHook from 'css-modules-require-hook'
import cssnext from 'postcss-cssnext'
cssModulesRequireHook({
	generateScopedName: '[name]__[local]',
  prepend: [
    cssnext(),
  ],
});
import initialData from './data/initial'
import request from 'superagent'
import Promise from 'promise'
import React from 'react'
import {Router} from 'react-router'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import express from 'express'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'

//stuff that uses css modules
const Root = require('./containers/Root')
const HTML = require('./components/html')
const routes = require('./routes')

import config from './config-local'


const PROD = config.PROD

let app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(require('cookie-parser')())
app.use(require('express-session')({ secret: 'superior app' }))
app.use(require('compression')())
app.use('/static', express.static(__dirname + '/dist/generated'))


const wantsJSON = (req) => {
	req.headers.accept.search('application/json') > -1
}

const renderReact = (initialData, markup) => {
	return '<!doctype html>' + renderToStaticMarkup(
		React.createElement(HTML, { BODY: markup, STATE: `window.initial = ${JSON.stringify(initialData)}` }))
}

const setCookie = (key, value, res, age = null) => {
	res.cookie(key, value, { path: '/', httpOnly: true, maxAge: age ? age : 60 * 60 * 24 * 2 })
}

const sendHTMLOrJSON = (req, res, data, routerState) => {
	if (wantsJSON(req)){
		res.json(data)
	} else {
		renderReact(data, routerState, markup => res.send(markup))
	}
}


function renderApp(props, res) {
  const markup = renderToString(<RoutingContext {...props}/>)
  const html = renderReact(initialData, markup)
  res.send(html)
}

app.get('*', (req, res) => {

  if (req.path === '/favicon.ico') {
    res.send('haha')
  }

  else {
    match({ routes, location: req.path }, (error, redirectLocation, renderProps) => {
      if (error)
        writeError('ERROR!', res)
      else if (redirectLocation)
        redirect(redirectLocation, res)
      else if (renderProps)
        renderApp(renderProps, res)
      else
        writeNotFound(res)
    })
  }

})


app.listen(config.port, () => console.log("App server is listening on port " + config.port))
