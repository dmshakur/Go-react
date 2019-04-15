import React, {Component} from 'react'
import firebase from '../../firebaseConfig'
import Point from '../Point/Point'
import Stone from '../Stone/Stone'
import styles from './GameBoard.module.css'

const tactInfo = {
  piece: "free", // Either black or white
  chainId: null, // corresponds to all the stones in a single chain
  openLinks: null, //number up to three, corresponds to the amount of trues in the Iff's Might need to get rid of this in favor of a more efficent operation
  topIff: null,
  rightIff: null,
  bottomIff: null,
  leftIff: null
}

const difficulty = { // Subtract one from the last number when used to set the white reserves
  easy: [81, {height: 324, width: 324}, 41],
  medium: [169, {height: 468, width: 468}, 85],
  go: [361, {height: 684, width: 684}, 181]
}

class GameBoard extends Component {

  state = {
    playerTurn: "black", //Black always initiates the game
    waitingPlayer: "white",
    boardPoints: [],     // This is the array that will contain all the <Point /> elements to be rendered, I do not think that this should be used after it is first used, I think
    boardPointsTact: {}, // This is the information for every square which all have a copy of tactInfo in them
    chains: [],
    currentChain: 0,
    elapsedTime: 0,
    isTiming: true,
    turnCount: 0,
    stonesCount: {
      whiteCaptures: 0,
      whiteReserves: null,
      blackCaptures: 0,
      blackReserves: null
    },
    turnData: []
  }

  boardGen = (t, num) => { // For initialization of the board only
    let tempBoardPoints = []
    let tempBoardPointsTact = {}
    for (let i = 0; i < num; i++) {
      tempBoardPointsTact.i = t
      tempBoardPoints.push(<Point onClick={this.handlePointClick} pos={i}></Point>)
    }

    this.setState({boardPointsTact: tempBoardPointsTact})
    this.setState({boardPoints: tempBoardPoints})

    return this.state.boardPoints
  }

  handleTurnChange = () => {
    if (this.state.playerTurn === "black") {
      this.setState({playerTurn: "white"})
      this.setState({waitingPlayer: "black"})
    } else {
      this.setState({playerTurn: "black"})
      this.setState({waitingPlayer: "white"})
    }
  }

  boardRender = e => {
    let tempBoardPointsTact = this.state.boardPointsTact
    let tempBoardPoints = this.state.boardPoints

    tempBoardPointsTact.map(obj => {
      for (let i = 0; i < 360; i++) {
        tempBoardPoints[i] = <Point onClick={this.handlePointClick} pos={i}><Stone className={styles.obj.piece} /></Point>
      }
    })
  }

  handleChainLinks = (pointTact, pos) => {

    let mergeChains = []
    let tempBoardPointsTact = this.state.boardPointsTact
    let tempPointTact = pointTact // This is just the object of the single point clicked where a piece should be placed

    // Finding any friendly chains, then pushing them to the above array
    if (this.state.boardPointsTact[pos - 1].piece === this.state.playerTurn) { //R
      mergeChains.push(this.state.boardPointsTact[pos - 1].chainId)
    }
    if (this.state.boardPointsTact[pos - 19].piece === this.state.playerTurn) { //T
      mergeChains.push(this.state.boardPointsTact[pos - 19].chainId)
    }
    if (this.state.boardPointsTact[pos + 1].piece === this.state.playerTurn) { //L
      mergeChains.push(this.state.boardPointsTact[pos + 1].chainId)
    }
    if (this.state.boardPointsTact[pos + 19].piece === this.state.playerTurn) { //B
      mergeChains.push(this.state.boardPointsTact[pos + 19].chainId)
    }

    if (mergeChains.length > 1) {
      // convert all links to have the same chainId then delete all the
      // old links from a copy of the chainId array, then replace the old with the new chainId
      mergeChains.map(cId => {
        tempBoardPointsTact.map(ob => {
          if (ob.chainId === cId) ob.chainId = this.state.currentChain + 1
        })
      })

      this.setState({boardPointsTact: tempBoardPointsTact})
      this.setState({boardPointsTact: tempBoardPointsTact})
      this.setState({currentChain: this.state.currentChain + 1})
      return tempPointTact
    } else if (mergeChains.length === 1) {
      tempPointTact.chainId = mergeChains[0]
      return tempPointTact
    }

  }

  handleTactChange = (pointTact, pos) => { // point represents an object holding all the tact data
    // Check surrounding areas links etc to determine how the state of the tactInfo should change
    let tempPointData = pointTact
    let tempPos = pos

    // Setting the IFF's below
    pos - 1 < 0    ? tempPointData.rightIff = this.state.waitingPlayer : tempPointData.rightIff = this.state.boardPointsTact[pos - 1].piece
    pos - 19 < 0   ? tempPointData.toptIff = this.state.waitingPlayer : tempPointData.topIff = this.state.boardPointsTact[pos - 19].piece
    pos + 1 > 360  ? tempPointData.leftIff = this.state.waitingPlayer : tempPointData.leftIff = this.state.boardPointsTact[pos + 1].piece
    pos + 19 > 360 ? tempPointData.bottomIff = this.state.waitingPlayer : tempPointData.bottomIff = this.state.boardPointsTact[pos + 19].piece

    if (tempPointData.rightIff === this.state.playerTurn ||
        tempPointData.leftIff === this.state.playerTurn ||
        tempPointData.topIff === this.state.playerTurn ||
        tempPointData.bottomIff === this.state.playerTurn) {
      this.handleChainLinks(tempPointData, tempPos)
    } else {
      tempPointData.chainId = this.state.currentChain + 1
      this.setState({currentChain: this.state.currentChain + 1})
      return tempPointData
    }
  }

  handlePointClick = (e, playerTurn) => {
    if (e.target.piece === "black" || e.target.piece === "white") return
    const targetPosition = e.target.pos
    let tempBoardPoints = this.state.boardPoints
    let tempBoardPointsTact = this.state.boardPointsTact

    console.log(targetPosition, tempBoardPoints, tempBoardPointsTact)

    tempBoardPointsTact[targetPosition] = this.handleTactChange(tempBoardPointsTact[targetPosition], targetPosition)
    this.setState({boardPointsTact: tempBoardPointsTact})
    this.setState({boardPoints: tempBoardPoints})
    this.handleTurnChange()
    this.boardRender()
  }

  render() {
    return (
      <div style={difficulty.medium[1]} className={styles.GameBoard}>
        <div className={styles.outer_board}>
          {
            this.boardGen(tactInfo, difficulty.medium[0])
          }
        </div>
      </div>
    )
  }
}

export default GameBoard
