import React, { Component } from 'react'
import firebase from '../../firebaseConfig'
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import styles from  './App.module.css'
import Main from '../../components/Main/Main'

class App extends Component {

  state = {
    timers: {},
    user: null,
    username: null,
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
  }

  handleLogout = () => {
    firebase.auth().signOut()
    .then(() => {
      console.log("User logged out successfully")
    })
    .catch(error => {console.log("Something went wrong: ", error.message)})
  }

  handleGame = (e) => {
    e.preventDefault()
    !this.state.isGame ? this.setState({isGame: true}) : this.setState({isGame: false})
  }

  render() {
    return (
      <div className={styles._app}>
        <header className={styles._header}>
          <h1 className={styles._title}>G O  R E A C T</h1>
        </header>
        <Main
          className={styles._app}
          isAuthenticated={this.state.isAuthenticated}
          isGame={this.state.isGame}
          username={this.state.username}
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
