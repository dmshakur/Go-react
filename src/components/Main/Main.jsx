import React from 'react'
import styles from './Main.module.css'
import Profile from '../Profile/Profile'
import Games from '../Games/Games'
import GameBoard from '../GameBoard/GameBoard'

const Main = props => {
  return (
    <div className={styles._main}>
      {
        props.isAuthenticated ? //Change back to props.isAuthenticated
        <div>
          {
            props.isGame ?
            <div>
              <div className={styles.to_the_left}>
                <Profile user={props.user}/>
                <div className={styles._button} onClick={props.handleLogout}>Logout</div>
              </div>
              <GameBoard user={props.user} className={styles._game} />
            </div>
            :
            <div>
              <div className={styles.to_the_left}>
                <Profile />
                <div className={styles._button} onClick={props.handleLogout}>Logout</div>
              </div>
              <div className={styles._game}>
                <form onSubmit={props.handleGame}>
                  <input />
                  <button className={styles._button} onClick={props.handleGame}>Start A New Game</button>
                </form>
                <Games />
              </div>
            </div>
          }
        </div>
        :
        <div className={styles._login}>
          <div className={styles._button} onClick={props.handleLogin}>Log in with Google</div>
        </div>
      }
    </div>
  )
}

export default Main
