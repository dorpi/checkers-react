import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import ScoreComponent from './ScoreComponent';

import CheckersBoardGame from './board/CheckersBoardGame';
import './display-style.css'


class Game extends Component {

    render() {

        const { score, moves } = this.props
        return (

            <div className="game-container">
                <div className="headline">
                    <h1 className='headline-text'>Checkers</h1>
                    <ScoreComponent score={score} moves={moves} />
                </div>
                    <div className='divider'></div>
              
                   
                        <CheckersBoardGame />

            </div>
        )
    }
}

Game.PropsTypes = {
    moves: PropsTypes.number.isRequired,
    score: PropsTypes.object.isRequired
}


const mapStateToProps = state => ({
    moves: state.moves,
    score: state.score,

});


export default connect(mapStateToProps)(Game);
