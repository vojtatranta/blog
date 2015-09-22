import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { Redirect, Router } from 'react-router'
import routes from '../routes'
import { connect } from 'react-redux'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import * as routerActions from '../actions/routerActions'

export default function(initialData, routerState = null) {
	if (!routerState) {
		routerState = {}
		routerState.history = new BrowserHistory()
	}
	const store = configureStore(initialData)

	if (routerState.history) {
		routerState.history.addChangeListener(function() {
			store.dispatch(routerActions.changeLocation(this.location.pathname))
		})
	}

	return class Root extends Component {
		render() {
			return (
		  		<Provider store={store}>
		  			{() => <Router {...routerState}>{routes}</Router>}
		  		</Provider>
			)
		}
	}
}

