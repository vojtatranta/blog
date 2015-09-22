import React from 'react'
import Root from './containers/Root'
import AppSass from './sass/app.sass'

const RootComponent = Root(window.initial)
React.render(<RootComponent />, document.getElementById('root'))