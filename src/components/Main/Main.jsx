import React from 'react'
import styles from './Main.module.css'
import Profile from '../Profile/Profile'
import Games from '../Games/Games'
import GameBoard from '../GameBoard/GameBoard'

const Main = props => {
  return (
    <div className={styles.main}>
      {
        !props.isAuthenticated ? //Change back to props.isAuthenticated
          <div>
            <button onClick={props.handleLogout}>Logout</button>
            <Profile />
            {
            props.isGame ?
              <GameBoard className={styles.game} />
            :
              <div className={styles.game}>
                <button onClick={props.handleGame}>Start A New Game</button>
                <Games />
              </div>
            }
          </div>
        :
          <div className={styles.login}>
            <button onClick={props.handleLogin}>Log In</button>
          </div>
      }
    </div>
  )
}

export default Main
