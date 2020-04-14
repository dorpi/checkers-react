import {CHANGE_PLAYER,UPDATE_MOVE,UPDATE_JUMP,UPDATE_BOARD_CELL,UPDATE_SCORE,UPDATE_MOVES_NUMBER,INIT,ADD_HISTORY,HISTORY_JUMP,HISTORY_MOVE} from '../actions/types';
import { EMPTY } from '../../gameLogic';


const initialBoard= [  
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [2,0,2,0,2,0,2,0],
        [0,2,0,2,0,2,0,2],
        [2,0,2,0,2,0,2,0]      
    ]

export function board (state=initialBoard,action){
    switch(action.type){
        case INIT:
          return initialBoard;
        case UPDATE_BOARD_CELL:
            return Object.assign([...state], {
                [action.payload.spot.x]: Object.assign([...state[action.payload.spot.x]], {
                  [action.payload.spot.y]: action.payload.value,
                
                })
              })

        case UPDATE_MOVE:
                return Object.assign([...state],
                  {
                    [action.payload.currentSpot.x]: Object.assign([...state[action.payload.currentSpot.x]], {
                      [action.payload.currentSpot.y]: EMPTY
                    })
                  }, {
                    [action.payload.newSpot.x]: Object.assign([...state[action.payload.newSpot.x]], {
                      [action.payload.newSpot.y]: action.payload.newSpot.value
                    })
                  })
            

        case UPDATE_JUMP:
            return Object.assign([...state], {
                [action.payload.currentSpot.x]: Object.assign([...state[action.payload.currentSpot.x]], {
                  [action.payload.currentSpot.y]: EMPTY
                })
              },{
                [action.payload.middleSpot.x]: Object.assign([...state[action.payload.middleSpot.x]], {
                  [action.payload.middleSpot.y]: EMPTY
                })
              },{
                [action.payload.newSpot.x]: Object.assign([...state[action.payload.newSpot.x]], {
                  [action.payload.newSpot.y]: action.payload.newSpot.value
                })
              })
              
        case HISTORY_JUMP:
          return Object.assign([...state], {
            [action.payload.currentSpot.x]: Object.assign([...state[action.payload.currentSpot.x]], {
              [action.payload.currentSpot.y]: action.payload.currentSpot.value
            })
          },{
            [action.payload.middleSpot.x]: Object.assign([...state[action.payload.middleSpot.x]], {
              [action.payload.middleSpot.y]: action.payload.middleSpot.value
            })
          },{
            [action.payload.newSpot.x]: Object.assign([...state[action.payload.newSpot.x]], {
              [action.payload.newSpot.y]: action.payload.newSpot.value
            })
          })
          case HISTORY_MOVE:
            return Object.assign([...state],
              {
                [action.payload.currentSpot.x]: Object.assign([...state[action.payload.currentSpot.x]], {
                  [action.payload.currentSpot.y]: action.payload.currentSpot.value
                })
              }, {
                [action.payload.newSpot.x]: Object.assign([...state[action.payload.newSpot.x]], {
                  [action.payload.newSpot.y]: action.payload.newSpot.value
                })
              })
        default:
            return state;            
    }
}


export function currentPlayer (state=0,action){
    switch(action.type){
      case INIT:
        return action.payload;
       case CHANGE_PLAYER:
           return action.payload
        default:
            return state;            
    }
}



const initialScore = {
    1:0,
    2:0
}

export function score (state=initialScore,action){
    switch(action.type){
       case UPDATE_SCORE:
          return {...state,[action.payload.player]:state[action.payload.player]+action.payload.num}
        case INIT:
            return initialScore;
        default:
            return state;            
    }
}



export function history (state=[],action){
    switch(action.type){
        case INIT:
          return [];
        case ADD_HISTORY:
            let newHistory=state.slice(0,action.payload.moves)
            return [...newHistory,action.payload.historyItem]
       
        default:
            return state;            
    }
}



export function moves (state=0,action){
    switch(action.type){
        case UPDATE_MOVES_NUMBER:
            return state+action.payload;
        case INIT:
          return 0;
        default:
            return state;            
    }
}
