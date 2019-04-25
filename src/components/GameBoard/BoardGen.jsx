import React from 'react'

boardGen = (t, num) => { // For initialization of the board only
  let tempBoardPoints = []
  let tempBoardPointsTact = {}
  for (let i = 0; i < num; i++) {
    tempBoardPointsTact[i] = t
    tempBoardPoints.push(<Point onClick={this.handlePointClick} pos={i}></Point>)
  }
  this.setState({/*boardPointsTact: tempBoardPointsTact, */boardPoints: tempBoardPoints, isGame: true})
  return tempBoardPointsTact
}

const BoardGen = props => {
  {
    boardGen(props.boardPointsTact, props.num)
  }
}

export default BoardGen
