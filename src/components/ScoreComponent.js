import React from 'react'
import Badge from 'react-bootstrap/Badge'
import PropsType from 'prop-types';


 const ScoreComponent=({score,moves}) =>{
    return (
        <div>
             
              <Badge pill style={{width:'200px'}} variant='danger'> Player1: {score[1]}</Badge>{' '}
              <Badge pill style={{width:'200px'}} variant="dark">    Player 2: {score[2]}</Badge>{' '}
              <Badge  style={{width:'100px'}}variant="primary"> Moves: {moves}</Badge>{' '}

       
        </div>
    )
}
ScoreComponent.PropsType = {
    score:PropsType.object.isRequired,
    moves:PropsType.number.isRequired
}

export default ScoreComponent;