import React from 'react'
import Button from 'react-bootstrap/Button'
import PropsType from 'prop-types';



const HistoryButton = ({undoClick,nextClick})=>{
  return (
    <div className="history-buttons">
        <Button
          variant="secondary"
          size="lg"
          
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
