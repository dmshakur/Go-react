import React from 'react'
import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'
import Footer from '../../components/Footer/Footer'

const Home = props => {
  return (
    <div>
      <Header />
      <Main
        user={props.user}
        isGame={props.isGame}
        isAuthenticated={props.isAuthenticated}
        handleGame={props.handleGame}
        handleChange={props.handleChange}
      />
      <Footer />
    </div>
  )
}

export default Home
