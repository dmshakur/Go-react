import React from 'react'
import styles from './Main.module.css'
import go from '../../pages/App/img/go.png'
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
                <img className={styles._google} onClick={props.handleLogout} src={"https://img.icons8.com/clouds/50/000000/google-logo.png"} />
              </div>
              <div id="game_board">
                <GameBoard gameDiff={props.gameDiff} user={props.user} className={styles._game} />
              </div>
            </div>
            :
            <div>
              <div className={styles.to_the_left}>
                <Profile />
                <img className={styles._google} onClick={props.handleLogout} src={"https://img.icons8.com/clouds/50/000000/google-logo.png"} />
              </div>
              <div className={styles._game}>
                <h1>Start A New Game:</h1>
                {/* Pass a gameId down to the gameboard when a new game is started */}
                <button className={styles._button} value={'easy'} onClick={props.handleGame}>Easy</button>
                <button className={styles._button} value={'medium'} onClick={props.handleGame}>Medium</button>
                <button className={styles._button} value={'go'} onClick={props.handleGame}>Go</button>
                <Games />
              </div>
            </div>
          }
        </div>
        :
        <div className={styles._login}>
          <img alt={"A small go board, undersized"} src={go} />
          <p className={styles._para}>Go is one of the oldest board games played by humankind.
            It has stood the test of time and to this day remains of the most popular and challenging games of strategy.
            Originating in the Zhou dynasty of 1046-256 BC, it is quite possibly the oldest continuously played board games on Earth.
            I reccomend that you read about it on wikipedia here. <a href={"https://en.wikipedia.org/wiki/Go_(game)"}>Go Board Game Wikipedia</a>
          </p>
          <img className={styles._google} onClick={props.handleLogin} src={"https://img.icons8.com/clouds/50/000000/google-logo.png"} />
        </div>
      }
    </div>
  )
}

export default Main
