import React from 'react'

import { Router } from 'react-router'

import styles from '../css/app.css'


export default class Content extends React.Component {

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.content__text}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
