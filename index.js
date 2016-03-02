import React from 'react'
import Root from './containers/Root'
import { match, Router} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { render } from 'react-dom'
import routes from './routes'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`
const RootComponent = Root(window.initial)

match({ routes, location }, () => {
  render(<RootComponent routes={routes} history={createBrowserHistory()}/>, document.getElementById('root'))
})
