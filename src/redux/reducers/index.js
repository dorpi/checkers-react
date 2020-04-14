import {combineReducers} from 'redux';
import {currentPlayer,board,score,history,moves} from './reducers'


export default combineReducers({
    currentPlayer,
    score,
    board,
    history,
    moves
})