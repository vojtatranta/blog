import React from 'react'

import { PROD } from '../config'

import styles from '../css/app.css'


export default class Html extends React.Component {

	render() {
		let bundlePath = PROD ? '/static/bundle.js' : '//localhost:3000/static/bundle.js'
		return (
			<html className={styles.html} lang="cs">
				<head>
					<title>VT | Vývoj Aplikací v JS</title>
					<link href='https://fonts.googleapis.com/css?family=Open+Sans|Poiret+One&subset=latin,latin-ext' rel='stylesheet' type='text/css'/>
					<meta name="viewport" content="width=device-width,initial-scale=1"/>
					{PROD && <link rel="stylesheet" type="text/css" href="/static/style.css"/>}
				</head>
				<body>
					<div id="root" dangerouslySetInnerHTML={ {__html: this.props.BODY} } />
				</body>
				<script dangerouslySetInnerHTML={ {__html: this.props.STATE} }/>
	  			<script async src={bundlePath}></script>
			</html>
		)
	}
}
