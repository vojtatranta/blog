import React from 'react'

import Nav from './nav'
import Content from './content'

import styles from '../css/app.css'


export default class App extends React.Component {

  render() {
    return (
      <div id="wrapper" className={styles['wrapper']}>
            <div className={styles['static-side']}>
              <div id="header">
                <h1 className={styles['main-heading']}>
                  vojta<br/>
                  <span className={styles['main-heading__last-name']}>tranta</span>
                </h1>
              </div>
                <Nav />
            </div>
        <div className={styles['flex-container']}>
          <div className={styles['static-placeholder']}>
          </div>
            <Content>
              {this.props.children}
            </Content>
        </div>
      </div>
    )
  }

}
