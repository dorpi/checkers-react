import React, { Component } from 'react'
import PropsType from 'prop-types';
import Table from 'react-bootstrap/Table'


import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Square from './Square ';
import HistoryButton from '../HistoryButton'
import StartButton from '../StartButton';

import { connect } from 'react-redux';

import {
  updateJump, updateBoardCell, updateMove, setPlayer, updateScore
  , changeMoveNumber, saveHistory, historyUndoClick, historyNextClick, startNewGame
} from '../../redux/actions/boardActions'
import { PLAYER1, PLAYER2, KING_PLAYER1, KING_PLAYER2, canJump, isWinner, getPaths } from '../../gameLogic'

import './board-styles.css'

const YELLOW_BORDER = '1px solid yellow';
const BLUE_BORDER = '1px solid blue';
const NO_BORDER = ''


class CheckersBoard extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      squarePicked: null,
      paths: [],
      message: "Start New Game"
    }
    this.tableRef = React.createRef();
    this.onClick = this.onClick.bind(this);
    this.undoClick = this.undoClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.onClickStartGame = this.onClickStartGame.bind(this);
  }


  componentDidMount() {
    this.setState({ message: 'Please Start New Game' })

    this.tableRef.current.style.pointerEvents = 'none';
    
  }


  componentDidUpdate(prevProps) {
    let winner = isWinner(this.props.score)
    if (prevProps.currentPlayer !== this.props.currentPlayer && !winner) {
      
      this.setState({ message: `Player ${this.props.currentPlayer} Turn` })
    }
    if (prevProps.score !== this.props.score){
      if (winner) {
        this.props.setPlayer(winner); 
        this.setTableHidden(true);
        this.setState({message:`GAME OVER Player ${winner} is the winner`})
      }
    }
  }


  setCellStyle = (cellSpot, style) => {
    let cell = this.tableRef.current.rows[cellSpot.x].cells[
      cellSpot.y
    ].firstChild;
    cell.style.border = style;
  }


  changePathsStyle = (paths, bool) => {
    if (paths.length > 0) {
      for (let i = 0; i < paths.length; i++) {
        let cell = this.tableRef.current.rows[paths[i].x].cells[paths[i].y]
          .firstChild;
        if (bool) {
          cell.style.border = BLUE_BORDER;
        } else {
          cell.style.border = NO_BORDER;
        }
      }
    }
    //Check if needed
    this.setState({ paths: paths });
  };



  setTableHidden(bool) {
    this.tableRef.current.hidden = bool;
    return;
  }


  onClick(event, cellPlayer, clickSpot) {

    let paths = []

    // Click on one of your soldires
    if (this.props.currentPlayer === cellPlayer ||
      (cellPlayer === KING_PLAYER1 && this.props.currentPlayer === PLAYER1) ||
      (cellPlayer === KING_PLAYER2 && this.props.currentPlayer === PLAYER2)) {

      if (!this.state.squarePicked) {
        event.target.style.border = YELLOW_BORDER;
        paths = getPaths(clickSpot, this.props.currentPlayer, cellPlayer, this.props.board);
        this.setState({ squarePicked: clickSpot, paths: paths }, () => {
          this.changePathsStyle(this.state.paths, true);

        })
      }
      else if (clickSpot.x === this.state.squarePicked.x && clickSpot.y === this.state.squarePicked.y) {
        event.target.style.border = NO_BORDER;
        this.changePathsStyle(this.state.paths, false);
        this.setState({ squarePicked: null, paths: [] });
      }
    }
    else if (this.state.paths.filter(path => {
      return clickSpot.x === path.x && clickSpot.y === path.y
    }).length > 0) {
      let middleSpot = { x: (this.state.squarePicked.x + clickSpot.x) / 2, y: (this.state.squarePicked.y + clickSpot.y) / 2 }
      if (canJump(this.state.squarePicked, clickSpot, middleSpot, this.props.currentPlayer, this.props.board)) {
        this.props.changeMoveNumber(1);
        this.props.saveHistory(this.state.squarePicked, clickSpot, this.props.currentPlayer, this.props.moves, this.props.board)

        //Send all spots with value 


        this.props.updateJump(this.state.squarePicked, clickSpot, middleSpot, this.props.currentPlayer, this.props.board)
        this.props.updateScore(this.props.currentPlayer, 1);
        paths = getPaths(clickSpot, this.props.currentPlayer, cellPlayer, this.props.board);
        paths = paths.filter(path => {
          return Math.abs(path.x - clickSpot.x) === 2 &&
            Math.abs(path.y - clickSpot.y) === 2
        })
        if (paths.length > 0) {
          this.changePathsStyle(this.state.paths, false);
          this.setCellStyle(this.state.squarePicked, NO_BORDER)
          this.setState({ squarePicked: clickSpot, paths: paths }, () => {
            this.changePathsStyle(this.state.paths, true);
          }
          )
        }
        else {//No more paths
          this.setCellStyle(this.state.squarePicked, '');
          this.changePathsStyle(this.state.paths, false);

          this.props.setPlayer(this.props.currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
          this.setState({ squarePicked: null, paths: [] });

        }
      }
      else {

        this.props.changeMoveNumber(1);
        this.props.saveHistory(this.state.squarePicked, clickSpot, this.props.currentPlayer, this.props.moves, this.props.board)
        this.props.updateMove(this.state.squarePicked, clickSpot, this.props.currentPlayer, this.props.board)
        this.setCellStyle(this.state.squarePicked, NO_BORDER);
        this.changePathsStyle(this.state.paths, false);
        this.props.setPlayer(this.props.currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1)
        this.setState({ squarePicked: null, paths: [] })
      }
    }
  }
  onClickStartGame() {
    this.tableRef.current.style.pointerEvents = "";
    if (this.tableRef.current.hidden){
      this.setTableHidden(false);
      this.setState({message:`Player ${this.props.currentPlayer} Turn`})
    }
    this.props.startNewGame();
  }

  undoClick() {
    if (this.props.moves > 0 && !this.state.squarePicked) {
      if (this.tableRef.current.hidden){
        this.setTableHidden(false);
        this.setState({message:`Player ${this.props.currentPlayer} turn`})
      }
      this.props.historyUndoClick(this.props.history, this.props.moves);
    }
  }

  nextClick() {
    if (this.props.moves < this.props.history.length && !this.state.squarePicked) {
      this.props.historyNextClick(this.props.history, this.props.moves)
    }
  }


  render() {
    const { board, currentPlayer } = this.props;
    const tableData = board.map((row, index) => {
      var indexes = row.map((cellPlayer, index2) => {
        var coordinates = { x: index, y: index2 };
        return (
          <td key={[coordinates.x, coordinates.y]}>
            <Square
              player={cellPlayer}
              onClick={event => {
                this.onClick(event, cellPlayer, coordinates);
              }
              }
            ></Square>
          </td>
        );
      });
      return <tr key={index}>{indexes}</tr>;
    })

   

    return (
      <div>
        <Row >
          <Col >
            <Table borderless responsive ref={this.tableRef}  >
              <tbody>
                {tableData}
              </tbody>
            </Table>
          </Col>
          <Col >
            <Row className='justify-content-md-center pb-5'>
              <h3  style={{ color: currentPlayer === PLAYER1 ? "red" : "black" }}>
                {this.state.message}
              </h3>
            </Row>
            <Row className='justify-content-md-center pr-3'>
              <StartButton onClick={this.onClickStartGame} />
              </Row>
              <Row  className='justify-content-md-center'> 
                <HistoryButton undoClick={this.undoClick} nextClick={this.nextClick} />
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

CheckersBoard.PropsType = {
  board: PropsType.array.isRequired,
  history: PropsType.array.isRequired,
  currentPlayer:PropsType.number.isRequired,
  moves:PropsType.number.isRequired,
  score:PropsType.array.isRequired,
}





const mapStateToProps = state => ({
  board: state.board,
  currentPlayer: state.currentPlayer,
  history: state.history,
  moves: state.moves,
  score: state.score,
});


export default connect(mapStateToProps, {updateJump, startNewGame, saveHistory, historyUndoClick, historyNextClick, updateMove, setPlayer, updateScore, updateBoardCell, changeMoveNumber })(CheckersBoard);