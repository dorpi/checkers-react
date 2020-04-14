import React from 'react'
import Button from 'react-bootstrap/Button'
import PropsType from 'prop-types';



const HistoryButton = ({undoClick,nextClick})=>{
  return (
    <div className='mb-2'>
        <Button
          variant="secondary"
          size="lg"
          className='mr-2  '
          onClick={() => {

            undoClick();

          }}
        >
          Undo
        </Button>

        <Button variant="secondary" size="lg" onClick={() =>
          nextClick()
        }>
          Next
        </Button>
      </div>
  )
}

HistoryButton.PropsType = {
  undoClick:PropsType.func.isRequired,
  nextClick:PropsType.func.isRequired
}
export default HistoryButton;