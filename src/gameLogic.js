
export const  KING_PLAYER2=4;
export const KING_PLAYER1 = 3;
export const EMPTY = 0;
export const PLAYER2=2;
export const PLAYER1 = 1;



export const canMove = (newSpot,board) => {
   
    if (newSpot.x >= 8 || newSpot.x < 0 || newSpot.y < 0 || newSpot.y >= 8 ||board[newSpot.x][newSpot.y] !== EMPTY)
        return false;
   

    return true;
};


export const canJump = (currentSpot, newSpot, middleSpot, currentPlayer,board) => {
  

    if (newSpot.x >= 8 || newSpot.x < 0 || newSpot.y < 0 || newSpot.y >= 8 || board[newSpot.x][newSpot.y] !== EMPTY)
        return false;
       
    if (Math.abs(newSpot.x - currentSpot.x) === 2 &&
        Math.abs(newSpot.y - currentSpot.y) === 2){

    let middleSpotValue =  board[middleSpot.x][middleSpot.y]

    if (currentPlayer === PLAYER1) {
        if (middleSpotValue === PLAYER2 || middleSpotValue === KING_PLAYER2)
            return true;
    }
    else {
        if (middleSpotValue === PLAYER1 || middleSpotValue === KING_PLAYER1)
            return true;
    }

    }
    else return false;

}


export const getPaths = (currentSpot, currentPlayer, cellPlayer, board) => {
    const paths = [];
    
    const leftUpper = {x: currentSpot.x + 1, y: currentSpot.y - 1 };
    const rightUpper = { x: currentSpot.x + 1, y: currentSpot.y + 1 };
    const leftDown = { x: currentSpot.x - 1, y: currentSpot.y - 1  };
    const rightDown = { x: currentSpot.x - 1, y: currentSpot.y + 1};
   
    
  
    if (cellPlayer !== PLAYER2) {
   
        
        if (canMove(leftUpper,board))
            paths.push(leftUpper);
        if (canMove(rightUpper,board))
            paths.push(rightUpper);
        let jumpSpot = { x: currentSpot.x + 2, y: currentSpot.y - 2 };
        if (canJump(currentSpot,jumpSpot, leftUpper, currentPlayer,board))
            paths.push(jumpSpot);
        jumpSpot = { x: currentSpot.x + 2, y: currentSpot.y + 2 };
        if (canJump(currentSpot,jumpSpot, rightUpper, currentPlayer,board))
            paths.push(jumpSpot);
    }
    
    if (cellPlayer !== PLAYER1) {
      
        if (canMove(leftDown,board))
            paths.push(leftDown);
        if (canMove(rightDown,board))
            paths.push(rightDown);
        let jumpSpot = { x: currentSpot.x - 2, y: currentSpot.y - 2 };
        if (canJump(currentSpot,jumpSpot, leftDown, currentPlayer,board))
            paths.push(jumpSpot);
        jumpSpot = { x: currentSpot.x - 2, y: currentSpot.y + 2 };
        if (canJump(currentSpot,jumpSpot, rightDown, currentPlayer,board))
            paths.push(jumpSpot);
    }
    return paths;
};


export const isKing = (currentPlayer,currentSpot)=>{
   
    if (currentPlayer === PLAYER2 && currentSpot.x === 0 ) 
    return true;
  else if (currentPlayer === PLAYER1 && currentSpot.x === 7 ) 
    return true;
  return false;
}


export const isWinner = (score)=>{
    if (score[1]===12)
        return PLAYER1
    else if (score[2]===12)
        return PLAYER2
    else
        return false;
}