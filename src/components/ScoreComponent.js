import React from 'react'
import Badge from 'react-bootstrap/Badge'
import PropsType from 'prop-types';


 const ScoreComponent=({score,moves}) =>{
    return (
        <div className="scores-display">
             
              <Badge pill className="player-score-display" variant='danger'> Player1: {score[1]}</Badge>{' '}
              <Badge pill className="player-score-display" variant="dark">    Player 2: {score[2]}</Badge>{' '}
              <Badge pill className="moves-display"variant="primary"> Moves: {moves}</Badge>{' '}

       
        </div>
    )
}
ScoreComponent.PropsType = {
    score:PropsType.object.isRequired,
    moves:PropsType.number.isRequired
}

export default ScoreComponent;
