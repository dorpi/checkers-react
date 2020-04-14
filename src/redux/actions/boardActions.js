import {
    CHANGE_PLAYER, UPDATE_BOARD_CELL, UPDATE_JUMP,
    UPDATE_MOVE, UPDATE_SCORE, UPDATE_MOVES_NUMBER, INIT,
    ADD_HISTORY, HISTORY_MOVE, HISTORY_JUMP
} from './types';

import { PLAYER1, PLAYER2, KING_PLAYER2, KING_PLAYER1, EMPTY, isKing } from '../../gameLogic';






export const setPlayer = (player) => {

    return {
        type: CHANGE_PLAYER,
        payload: player
    }
}

export const updateBoardCell = (spot, value) => {
    return {
        type: UPDATE_BOARD_CELL,
        payload: { spot, value }
    }
}

export const updateJump = (currentSpot, newSpot, middleSpot, currentPlayer, board) => {
    if (isKing(currentPlayer, newSpot)) {
        if (currentPlayer === PLAYER1)
            newSpot.value = KING_PLAYER1
        else
            newSpot.value = KING_PLAYER2
    }
    else
        newSpot.value = board[currentSpot.x][currentSpot.y]
    return {
        type: UPDATE_JUMP,
        payload: {
            currentSpot,
            newSpot,
            middleSpot
        }
    }
}

export const updateMove = (currentSpot, newSpot, currentPlayer, board) => {
    if (isKing(currentPlayer, newSpot)) {
        if (currentPlayer === PLAYER1)
            newSpot.value = KING_PLAYER1
        else
            newSpot.value = KING_PLAYER2
    }
    else
        newSpot.value = board[currentSpot.x][currentSpot.y]

    return {
        type: UPDATE_MOVE,
        payload: {
            currentSpot,
            newSpot
        }
    }
}

export const updateScore = (player, num) => {
    return {
        type: UPDATE_SCORE,
        payload: {

            player,
            num
        }
    }
}

export const changeMoveNumber = (num) => {
    return {
        type: UPDATE_MOVES_NUMBER,
        payload: num
    }
}


export const startNewGame = () => {
    let player =Math.floor(Math.random() * 2) + 1;
    return {
        type: INIT,
        payload:player
    }
}


export const saveHistory = (currentSpot, newSpot, currentPlayer, moves, board) => {
    let historyItem = {}
    if (Math.abs(currentSpot.x - newSpot.x) === 2 &&
        Math.abs(currentSpot.y - newSpot.y) === 2) {
        historyItem.middleSpot = {
            x: Math.abs(newSpot.x + currentSpot.x) / 2,
            y: Math.abs(newSpot.y + currentSpot.y) / 2,
            value: board[Math.abs(newSpot.x + currentSpot.x) / 2][Math.abs(currentSpot.y + newSpot.y) / 2]
        }
    }
    historyItem.currentSpot = {
        x: currentSpot.x,
        y: currentSpot.y,
        value: board[currentSpot.x][currentSpot.y]
    }
    historyItem.newSpot = {
        x: newSpot.x,
        y: newSpot.y,
        value: board[newSpot.x][newSpot.y]
    }
    if (historyItem.currentSpot.value === KING_PLAYER1 || historyItem.currentSpot.value === KING_PLAYER2) {
        historyItem.king = true;
    }
    else
        historyItem.king = false;


    historyItem.currentPlayer = currentPlayer
    return {
        type: ADD_HISTORY,
        payload: {
            historyItem,
            moves
        }
    }
}

export const setHistoryItemToBoard = (itemHistory) => {

    if ('middleSpot' in itemHistory) {
        return {
            type: HISTORY_JUMP,
            payload: {
                currentSpot: itemHistory.currentSpot,
                middleSpot: itemHistory.middleSpot,
                newSpot: itemHistory.newSpot
            }
        }
    }
    else {
        return {
            type: HISTORY_MOVE,
            payload: {
                currentSpot: itemHistory.currentSpot,
                newSpot: itemHistory.newSpot
            }
        }
    }
}


export const historyUndoClick = (history, moves) => dispatch => {
    let hMoves = moves - 1;
    if ('middleSpot' in history[hMoves]) {
        while (history[hMoves].currentPlayer === history[hMoves - 1].currentPlayer) {
            dispatch(setHistoryItemToBoard(history[hMoves]))
            hMoves--;
        }
        dispatch(setHistoryItemToBoard(history[hMoves]));
        dispatch(updateScore(history[hMoves].currentPlayer, hMoves - moves));
        dispatch(setPlayer(history[hMoves].currentPlayer));
        dispatch(changeMoveNumber(hMoves - moves));
    }
    else {
        dispatch(setHistoryItemToBoard(history[hMoves]));
        dispatch(setPlayer(history[hMoves].currentPlayer))
        dispatch(changeMoveNumber(-1))
    }
}


export const historyNextClick = (history, moves) => dispatch => {

    let hMoves = moves;
    let newSpot = {};
    //Change value for the update
    if (isKing(history[hMoves].currentPlayer,history[hMoves].newSpot)){
        let king = history[hMoves].currentPlayer===1?KING_PLAYER1:KING_PLAYER2;
         newSpot = { ...history[hMoves].newSpot, value: king }
    }
    else{
        newSpot = { ...history[hMoves].newSpot, value: history[hMoves].currentSpot.value }
    }



    if ('middleSpot' in history[hMoves]) {

        let currentSpot = { ...history[hMoves].currentSpot, value: history[hMoves].newSpot.value }
        let middleSpot = { ...history[hMoves].middleSpot, value: EMPTY }

        dispatch(setHistoryItemToBoard({ newSpot, currentSpot, middleSpot, currentPlayer: history[hMoves] }));
        dispatch(updateScore(history[hMoves].currentPlayer, 1));
        dispatch(changeMoveNumber(1));

        while (hMoves < history.length - 1 && history[hMoves].currentPlayer === history[hMoves + 1].currentPlayer) {
            hMoves++;
            newSpot = { ...history[hMoves].newSpot, value: history[hMoves].currentSpot.value }
            let currentSpot = { ...history[hMoves].currentSpot, value: history[hMoves].newSpot.value }
            let middleSpot = { ...history[hMoves].middleSpot, value: EMPTY }
            dispatch(setHistoryItemToBoard({ newSpot, currentSpot, middleSpot, currentPlayer: history[hMoves].currentPlayer }))
            dispatch(updateScore(history[hMoves].currentPlayer, 1));
            dispatch(changeMoveNumber(1));
        }
    }
    else {
        let currentSpot = { ...history[hMoves].currentSpot, value: history[hMoves].newSpot.value }
        dispatch(setHistoryItemToBoard({ newSpot, currentSpot, currentPlayer: history[hMoves].currentPlayer }));
        dispatch(changeMoveNumber(1))

    }
    dispatch(setPlayer(history[hMoves].currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1));
}


