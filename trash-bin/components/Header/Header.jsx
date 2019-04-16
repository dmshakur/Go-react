import React from 'react'
import styles from './Header.module.css'

const Header = props => {
  return (
    <div className={styles._header}>
      <h1>GO / REACT</h1>
      <div className={styles.go_nav_menu}></div>
      <div className={styles.go_nav_button}>
      </div>
    </div>
  )
}

export default Header
