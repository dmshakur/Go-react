import React, {Component} from 'react'
import Point from '../Point/Point'
import Stone from '../Stone/Stone'
import styles from './GameBoard.module.css'

const difficulty = { // Subtract one from the last number when used to set the white reserves
  easy: [81, {height: 324, width: 324}, 41, 9],
  medium: [169, {height: 468, width: 468}, 85, 13],
  go: [361, {height: 684, width: 684}, 181, 19]
}

const tactInfo = {
  piece: "free",   // Either black or white
  chainId: null,   // corresponds to all the stones in a single chain
  openLinks: null, // number up to three, corresponds to the amount of trues in the Iff's Might need to get rid of this in favor of a more efficent operation
  topIff: "free",
  rightIff: "free",
  bottomIff: "free",
  leftIff: "free"
}

class GameBoard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      playerTurn: "black", // Black always initiates the game
      waitingPlayer: "white",
      myColor: "",
      boardPoints: [], // This is the array that will contain all the <Point /> elements to be rendered, I do not think that this should be used after it is first used, I think
      boardPointsTact: [], // This is the information for every square which all have a copy of tactInfo in them
      prevBoardPointsTact: [],
      chains: [],
      currentChain: 0,
      elapsedTime: 0,
      turnCount: 0,
      isTiming: true,
      stonesCount: {
        whiteCaptures: 0,
        whiteReserves: null,
        blackCaptures: 0,
        blackReserves: null
      },
      turnData: []
    }
    this.handleChainLinks = this.handleChainLinks.bind(this)
    this.boardGen = this.boardGen.bind(this)
    this.handleTurnChange = this.handleTurnChange.bind(this)
    this.handleTactChange = this.handleTactChange.bind(this)
    this.handleChainLinks = this.handleChainLinks.bind(this)
  }

  boardGen = num => { // For initialization of the board only
    let tempBoardPoints = []
    let tempBoardPointsTact = {}
    for (let i = 0; i < num; i++) {
      tempBoardPointsTact[i] = tactInfo
      tempBoardPoints.push(<Point handlePointClick={(e) => this.handlePointClick(i, e)} pos={i} />)
    }
    this.setState({
      boardPointsTact: tempBoardPointsTact,
      boardPoints: tempBoardPoints,
      stonesCount: {
        whiteReserves: (difficulty[this.props.gameDiff][2] - 1),
        blackReserves: difficulty[this.props.gameDiff][2]
      }
    })
  }

  handleTurnChange = () => {
    if (this.state.playerTurn === "black") {
      this.setState({playerTurn: "white", waitingPlayer: "black"})
    } else {
      this.setState({playerTurn: "black", waitingPlayer: "white"})
    }
  }

  boardRender = e => {
    let x, tempBoardPoints = this.state.boardPoints
    for (x in tempBoardPoints) {
      if (this.state.boardPointsTact[x].piece !== "free") {
        tempBoardPoints[x] = <Point><Stone className={styles[this.state.boardPointsTact[x].piece]} /></Point>
      }
    }
    this.setState({boardPoints: tempBoardPoints})
  }

  handleChainLinks = (pointTact, arr) => { // Needs work
    // Finding any friendly chains, then pushing them to the above array
    // convert all links to have the same chainId then delete all the
    // old links from a copy of the chainId array, then replace the old with the new chainId

    let mergeChains = [], tempChains = this.state.chains, x, tempBoardPointsTact // Getting all the chain ID's here
    arr.forEach(function(num) {
      if (this.state.boardPointsTact[num].piece === this.state.playerTurn)
        mergeChains.push(this.state.boardPointsTact[num].chainId)
    })

    if (pointTact.chainId !== null) mergeChains.push(pointTact.chainId)

    if (mergeChains.length > 1) {
      mergeChains.map(chainId => {
        for (x in tempBoardPointsTact) {
          if (tempBoardPointsTact.chainId === chainId) {
            tempBoardPointsTact.chainId = this.state.currentChain + 1
            if (tempChains[0] !== this.state.currentChain + 1) tempChains.unshift(this.state.currentChain + 1)
          }
        }
      })
      this.setState({currentChain: this.state.currentChain + 1, chains: tempChains})
    } else if (mergeChains.length === 1) {
      pointTact.chainId = mergeChains[0]
    }
  }

  handleTactChange = (pointTact, pos) => { // point represents an object holding all the tact data
    // Check surrounding areas links etc to determine how the state of the tactInfo should change
    // Setting the IFF's below
    // Need to further edit below, need to edit the IFF's of pieces adjacent
    let num = difficulty[this.props.gameDiff][3], tempPointTact = pointTact, chainIdArr = []

    // pos - 1 < 0 ? tempPointTact.rightIff = this.state.waitingPlayer :
    tempPointTact.rightIff = this.state.boardPointsTact[pos - 1].piece
    // pos - num < 0 ? tempPointTact.toptIff = this.state.waitingPlayer :
    tempPointTact.topIff = this.state.boardPointsTact[pos - num].piece
    // pos + 1 > (difficulty[this.props.gameDiff][0] - 1) ? tempPointTact.leftIff = this.state.waitingPlayer :
    tempPointTact.leftIff = this.state.boardPointsTact[pos + 1].piece
    // pos + num > (difficulty[this.props.gameDiff][0] - 1) ? tempPointTact.bottomIff = this.state.waitingPlayer :
    tempPointTact.bottomIff = this.state.boardPointsTact[pos + num].piece

    if (tempPointTact.rightIff === this.state.playerTurn && tempPointTact.rightIff !== null) {
      chainIdArr.push(this.state.boardPointsTact[pos - 1].chainId)
    }
    if (tempPointTact.topIff === this.state.playerTurn && tempPointTact.topIff !== null) {
      chainIdArr.push(this.state.boardPointsTact[pos - num].chainId)
    }
    if (tempPointTact.leftIff === this.state.playerTurn && tempPointTact.leftIff !== null) {
      chainIdArr.push(this.state.boardPointsTact[pos + 1].chainId)
    }
    if (tempPointTact.bottomIff === this.state.playerTurn && tempPointTact.bottomIff !== null) {
      chainIdArr.push(this.state.boardPointsTact[pos + num].chainId)
    }
    if (chainIdArr.length > 0) {
      this.handleChainLinks(tempPointTact, chainIdArr)
      return tempPointTact
    } else {
      tempPointTact.chainId = this.state.currentChain + 1
      this.setState({currentChain: this.state.currentChain + 1})
      return tempPointTact
    }
  }

  handlePointClick = (pos, e) => { // Function that is triggered on click of a div where a go piece is placeable
    e.preventDefault()
    if (this.state.boardPointsTact[pos].piece === "black" || this.state.boardPointsTact[pos].piece === "white") return
    let tempBoardPointsTact = this.state.boardPointsTact
    tempBoardPointsTact[pos].piece = this.state.playerTurn
    let temp = this.handleTactChange(tempBoardPointsTact[pos], pos)
    tempBoardPointsTact[pos] = temp
    this.setState({boardPointsTact: tempBoardPointsTact})
    this.handleTurnChange()
    this.boardRender()
  }

  componentWillMount() {
    this.boardGen(difficulty[this.props.gameDiff][0])
  }

  render() {
    return (
      <div style={difficulty[this.props.gameDiff][1]} className={styles.GameBoard}>
        {
          this.state.boardPoints
        }
      </div>
    )
  }
}

export default GameBoard
