import React, { Component } from 'react'
//import "./square.css"
import PropsTypes from 'prop-types';
import './board-styles.css'

class Square extends Component {


    renderPiece = (player) => {

        if (player === 0)
            return "piece"
        else if (player === 1)
            return "piece player1"
        else if (player === 2)
            return "piece player2"
        else if (player === 3)
            return "piece king-player1"
        else if (player === 4)
            return "piece king-player2"
    }


    render() {
        const { player, onClick } = this.props
        return (
            <div className={this.renderPiece(player)} onClick={onClick} >
                {player === 3 || player === 4 ? 'K' : ""}
            </div>
        )
    }
}


Square.PropsTypes = {
    cellPlayer: PropsTypes.string.isRequired,
    onClick: PropsTypes.func.isRequired,
}

export default Square;