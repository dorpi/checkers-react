import React from 'react'
import Button from 'react-bootstrap/Button'
import PropsType from 'prop-types'
 const StartButton=({onClick})=> {
    
    return (
        <Button 

        className='mb-3 ml-3 '
        variant="primary"
        size="lg"
        onClick={()=>
          onClick()}
      >
        Start Game
      </Button>
    )
}

StartButton.PropsType={
  onClick:PropsType.func.isRequired
}


export default StartButton