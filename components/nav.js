import React from 'react'

import { Link } from 'react-router'

import icn from '../helpers/react-helper'

import styles from '../css/app.css'


export default class Nav extends React.Component {

  render() {
    return (
      <ul className={styles.nav}>
        <li className={styles.nav__item}>
          <Link className={icn([styles['nav__item__link--bio'], styles.nav__item__link])} to="/">Bio</Link>
        </li>
        <li className={styles.nav__item}>
          <Link className={icn([styles['nav__item__link--contact'], styles.nav__item__link])} to="/contact">Kontakt</Link>
        </li>
      </ul>
    )
  }

}
