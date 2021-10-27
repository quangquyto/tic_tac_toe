import React from "react";
import Square from "../Square";
const Board=({winline,squares,onClick})=>
{
    const renderSquare=(i)=>
    {
        return (<Square value={squares[i]} 
                    onClick={() =>onClick(i)}
                    highlight={winline && winline.includes(i)}           
              />
              );
    }
     const renderRow=()=>
      {
        const Board_square=[]
        for(let r=0;r<5;r++){
          const row=[];
          for(let c=0;c<5;c++){
              row.push(<span key={(r*5+c)}>{renderSquare(r*5+c)}</span>)
          }
          Board_square.push(<div key={r} className="board-row">{row}</div>)
        }
        return Board_square;
    }
    
        return (
          <div>
            {renderRow()}
          </div>
        );
    
    
}
export default Board;
