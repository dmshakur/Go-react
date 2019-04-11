import React, {Component} from 'react'
import Point from '../Point/Point'
import styles from './GameBoard.module.css'

class GameBoard extends Component {

  state = {
    tactInfo: {
      linkId: null, // corresponds to all the stones in a single chain
      openLinks: null, //number up to three, corresponds to the amount of trues in the Iff's
      topIff: null,
      rightIff: null,
      bottomIff: null,
      leftIff: null
    },
    boardElements: [],
    boardData: [],
    difficulty: {
      easy: [81, {height: 324, width: 324}],
      medium: [169, {height: 468, width: 468}],
      go: [361, {height: 684, width: 684}]
    }
  }

  boardGen = (t, num) => {
    for (let i = 0; i < num; i++) {
      this.state.boardData.push(t)
      this.state.boardElements.push(<Point pos={i} />)
    }
    return this.state.boardElements
  }

  render() {
    return (
      <div style={this.state.difficulty.medium[1]} className={styles.GameBoard}>
        {
          this.boardGen(this.state.tactInfo, this.state.difficulty.medium[0])
        }
      </div>
    )
  }
}

export default GameBoard
