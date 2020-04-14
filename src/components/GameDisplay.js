import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ScoreComponent from './ScoreComponent';


import CheckersBoardGame from './board/CheckersBoardGame';
import './display-style.css'


class Game extends Component {

    render() {

        const { score, moves } = this.props
        return (


            <Container className="game-container">
                <Row>
                    <Col xs={3}>
                        <ScoreComponent score={score} moves={moves} />
                    </Col>
                    <Col >
                        <h4 className='text-center title'>Checkers Board Game</h4>
                    </Col>
                </Row>
                <Row>
                    <div className='divider'></div>
                </Row>
                <Row className='row justify-content-md-center'>
                    <Col >
                        <CheckersBoardGame />
                    </Col>
                </Row>
            </Container>
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