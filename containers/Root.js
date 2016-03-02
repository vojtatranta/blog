import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { connect } from 'react-redux'
import { Router } from 'react-router'


export default (initialData) => {

	const store = configureStore(initialData)

	return class Root extends React.Component {

		render() {
			return (
		  		<Provider store={store}>
		  			<Router {...this.props} />
		  		</Provider>
			)
		}

	}
}

