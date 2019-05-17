import React, { Component } from 'react'
import firebase from '../../firebaseConfig'
import styles from  './App.module.css'
import './App.fonts.css'
import go from '../../pages/App/img/go.png'
import Games from '../../components/Games/Games'
import GameBoard from '../../components/GameBoard/GameBoard'

class App extends Component {

  state = {
    timers: {},
    user: null,
    username: null,
    gameDiff: "",
    isGame: false,
    isAuthenticated: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      firebaseUser ?
        this.setState({
          user: firebaseUser.displayName,
          isAuthenticated: true
        })
        :
        this.setState({
          user: null,
          isAuthenticated: false
        })
    })
  }

  handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      this.setState({username: result.displayName})
      console.log("User Logged In Successfully", this.state.user)
    })
    .catch(error => {
      console.log("Something Went Wrong: ", error.message)
    })
    // Create user with email for reuse and name for display
  }

  handleLogout = () => {
    firebase.auth().signOut()
    .then(() => {
      console.log("User logged out successfully")
    })
    .catch(error => {console.log("Something went wrong: ", error.message)})
  }

  handleGame = e => {
    e.preventDefault()
    this.setState({gameDiff: e.target.value})
    !this.state.isGame ? this.setState({isGame: true}) : this.setState({isGame: false})
  }

  render() {
    return (
      <div className={styles._app}>
        <div className={styles._sidebar}> {/*Sidebar*/}
          <h1>GO</h1>
          <div className={styles._user}>{this.state.user}</div>
          <div>
            <button className={styles._button} onClick={this.state.isAuthenticated ? this.handleLogout : this.handleLogin}>{this.state.isAuthenticated ? <span>Logout</span> : <span>Login</span>}</button>
          </div>
          {
            this.state.isAuthenticated && !this.state.isGame ?
            <div>
              <div>Start a new game</div>
              <button className={styles._button} value="easy" onClick={this.handleGame}>Easy</button>
              <button className={styles._button} value="medium" onClick={this.handleGame}>Medium</button>
              <button className={styles._button} value="go" onClick={this.handleGame}>Go</button>
            </div>
            :
            !this.state.isAuthenticated ? <div>Login to start a new game</div> : <div>{/*Create a react component for the stats of the game or similar info*/}</div>
          }
        </div> {/* End Sidebar*/}
        <div className={styles._main}>
          {
            this.state.isAuthenticated ?
            <div className={styles._board}>
              {
                this.state.isGame ?
                <GameBoard gameDiff={this.state.gameDiff} user={this.state.user} className={styles._game} />
                :
                <Games />
              }
            </div>
            :
            <div className={styles._landing}>
              <img alt={"A small go board"} src={go} />
              <p className={styles._para}>Go is one of the oldest board games played by humankind.
                It has stood the test of time and to this day remains of the most popular and challenging games of strategy.
                Originating in the Zhou dynasty of 1046-256 BC, it is quite possibly the oldest continuously played board games on Earth.
                I recommend that you read about it on wikipedia here. <a href={"https://en.wikipedia.org/wiki/Go_(game)"}>Go Wiki Page</a>
              </p>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default App

// -.. .----. .- -. --. . .-.. --- / -- .- .-.. -.-. --- .-.. -- / ... .... .- -.- ..- .-.
