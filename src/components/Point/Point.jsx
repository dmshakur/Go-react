import React from 'react'
import styles from './Point.module.css'

const Point = props => {
  return (
    <div className={styles.square}>
      <div className={styles.nw}></div>
      <div className={styles.ne}></div>
      <div className={styles.sw}></div>
      <div className={styles.se}></div>
    </div>
  )
}

export default Point
