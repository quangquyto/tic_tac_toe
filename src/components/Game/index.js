import React, { useState } from "react";
import Board from "../Board";
const Game=()=>{
    const [history,setHistory]=useState ([{
        squares: Array(25).fill(null),
      }]);
    const [stepNumber,setStepNumber]=useState(0);
    const [xIsNext,setxIsNext]=useState(true);
    const [isAscending,setisAscending]=useState(true);
    const jumpTo=(step)=>
    {
          setStepNumber(step);
          setxIsNext(step%2===0);
    }
    const handleClick=(i)=>
    {
        const newHistory=history.slice(0,stepNumber+1);
        const current=newHistory[newHistory.length-1];
        const squares=current.squares.slice();
        if (calculateWinner(squares).Win ) {
          return;
        }
        if(squares[i]){
          return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(newHistory.concat([{
            squares: squares,
            latemove:i,
          }]));
        setStepNumber(newHistory.length);
        setxIsNext(!xIsNext);
    }
      const newHistory=history;
      const current=newHistory[stepNumber];
      const winner=calculateWinner(current.squares);
      const stepnumber=stepNumber;
      const win=winner.Win;
      const isascending =isAscending;
      let moves=history.map((step,move)=>{
        const latestMoveSquare = step.latemove;
        const col = 1 + latestMoveSquare % 5;
        const row = 1 + Math.floor(latestMoveSquare / 5);
        const desc=move?
        'Go to move #'+move + '('+col+','+row+')':
        'Go to game start';
        return(
          <li key={move}>
            <button className={move===stepnumber?"current-item-selected":""}
            onClick={()=>jumpTo(move)}>{desc}</button>
          </li>
        )
  
      }
      )
      if (!isascending) {
        moves.reverse();
      }
  
      let status;
      if (winner.Win) {
        status = 'Winner: ' + win;
      } 
      else if(winner.isDraw)
        status="The match is Draw";
      else
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
      
      return(
        <div className="game">
          <div className="game-board"><Board squares={current.squares} 
                                      onClick={(i)=>handleClick(i)}
                                      winline={winner.line} /></div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={() => setisAscending(!isAscending)}>
            {isAscending ? 'descending' : 'ascending'}
          </button>
            <ol>{moves}</ol>
          </div>
        </div>
      )

};
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2,3,4],
      [5, 6, 7,8,9],
      [10,11, 12,13,14],
      [15,16, 17, 18,19],
      [20, 21, 22,23,24],
      [0, 5, 10,15,20],
      [1,6,11, 16, 21],
      [2, 7, 12,17,22],
      [3,8,13,18,23],
      [4,9,14,19,24],
      [0,6,12,18,24],
      [4,8,12,16,20]
    ];
    let isDraw;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c,d,e] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a]===squares[d] &&squares[a]===squares[e]) {
        return {
        Win: squares[a],
        line: [a,b,c,d,e],
        isDraw:false,
            };
      }
    } 
    isDraw=true;
    for(let i=0;i<squares.length;i++){
      if(squares[i]===null){
        isDraw=false
        break;
      }
  
    }
    return {
      Win: null,
      isDraw:isDraw,
    };
    
  }
export default Game;