import React, { Component } from 'react'
import firebase from '../../firebaseConfig'
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import styles from  './App.module.css'
import Main from '../../components/Main/Main'

class App extends Component {

  state = {
    timers: {},
    user: null,
    userData: {},
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
    .then(() => {
      console.log("User Logged In Successfully")
    })
    .catch(error => {
      console.log("Something Went Wrong: ", error.message)
    })
  }

  handleLogout = () => {
    firebase.auth().signOut()
    .then(() => {
      console.log("User logged out successfully")
    })
    .catch(error => {console.log("Something went wrong: ", error.message)})
  }

  handleGame = () => {
    !this.state.isGame ? this.setState({isGame: true}) : this.setState({isGame: false})
  }

  userDataCreation = () => {
    
  }

  render() {
    return (
      <div className={styles._app}>
        <header className={styles._header}>
          <h1 className={styles._title}>GO REACT</h1>
        </header>
        <Main
          className={styles._app}
          isAuthenticated={this.state.isAuthenticated}
          isGame={this.state.isGame}
          user={this.state.user}
          handleGame={this.handleGame}
          handleChange={this.handleChange}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
        <footer className={styles.bar_footer}>Made by Code Mcgyver and the FRN stack 04/19 status incomplete</footer>
      </div>
    )
  }
}

export default App

// -.. .----. .- -. --. . .-.. --- / -- .- .-.. -.-. --- .-.. -- / ... .... .- -.- ..- .-.
