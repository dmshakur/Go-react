import React, { Component } from 'react'
import firebase from '../../firebaseConfig'
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css'
import Home from '../Home/Home'

class App extends Component {

  constructor() {
    super()
  }

  state = {
    timers: {},
    user: null,
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

  render() {
    return (
      <div className="App">
        <Home
          isAuthenticated={this.state.isAuthenticated}
          isGame={this.state.isGame}
          user={this.state.user}
          handleGame={this.handleGame}
          handleChange={this.handleChange}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
      </div>
    );
  }
}

export default App
