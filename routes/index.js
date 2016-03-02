if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { IndexRoute, Route } from 'react-router'

import App from '../components/app'
import Bio from '../components/bio'


export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Bio
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [ require('./contact') ])
    })
  },
}

