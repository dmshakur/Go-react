import React, {Component} from 'react'
import Point from '../Point/Point'
import styles from './GameBoard.module.css'

class GameBoard extends Component {

  state = {
    tactical: {
      linkId: null, // corresponds to all the stones in a single chain
      openLinks: null, //number up to three, corresponds to the amount of trues in the Iff's
      topIff: null,
      rightIff: null,
      bottomIff: null,
      leftIff: null
    }
  }

  var boardElements = []
  var boardData = []

  const boardGen = t => {
    for (let i = 0; i < 361; i++) {
      boardData.push(t)
      boardElements.push(<Point />)
    }
    return boardElements
  }

  render() {
    return (
      <div className={styles.GameBoard}>
        {
          boardGen(this.state.tactical)
        }
      </div>
    )
  }
}

export default GameBoard
