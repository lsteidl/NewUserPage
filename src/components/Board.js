import { useState, useEffect } from 'react';
import Square from './Square';
//{ xIsNext, squares, onPlay 
export default function Board() {
    var initialValues = Array.from({length: 8}, () => Math.floor(Math.random() * 6));
    initialValues.push(...initialValues);
    initialValues = shuffle(initialValues);
    const [showColors, setShowColors] = useState(Array(16).fill(0)); // which colors/cards are selected
    const [squares, setSquares] = useState(initialValues); // which color is each square
    var [colors, setColors] = useState("hideAll");
    const [turn1, setTurn1] = useState(null); // track choice for turn 1 
    const [turn2, setTurn2] = useState(null); // track choice for turn 2
    function resetBoard(){
        setShowColors(Array(16).fill(0)); // tracks individual showing colors
        setSquares(initialValues); // tracks value (color) of each square
        setColors("hideAll");
        setTurn1(null);
        setTurn2(null);
    }
    useEffect(() => {
        if(turn1 !== null && turn2 !== null){
            console.log("both turns taken, not null");
            console.log("comparing: " + squares[turn1] + " and " + squares[turn2]);
            if(squares[turn1] === squares[turn2]){ // match found, remove squares
                console.log("MATCH FOUND");
                const nextSquares = squares.slice();
                nextSquares[turn1] = -1;
                nextSquares[turn2] = -1;
                setTimeout(function(){ // delay to show wrong choice for 2 seconds
                    setSquares(nextSquares);
                    setTurn1(null);
                    setTurn2(null);
                }, 500)
            }
            else{ // flip squares back over
                const nextColors = showColors.slice();
                nextColors[turn1] = 0;
                nextColors[turn2] = 0;
                setTimeout(function(){ // delay to show wrong choice for 2 seconds
                    setShowColors(nextColors);  
                    setTurn1(null);
                    setTurn2(null);
                   // setShowColors(Array(16).fill(0));
                }, 1000);
                
            }
            // setTurn1(null);
            // setTurn2(null);
        }   
      });
    async function updateTurn(turn, value){
        if(turn === 1) setTurn1(value);
        else setTurn2(value);
    }
    function handleClick(value){
        if(turn1 === null || turn2 === null){
            // show chosen square
            const nextColors = showColors.slice();
            nextColors[value] = 1;
            setShowColors(nextColors);
            if(turn1 === null){
                console.log("turn 1 ");
                updateTurn(1, value);
            }
            else if (turn2 === null){
                console.log("turn 2");
                updateTurn(2, value);
            }
            console.log("turn1: " + turn1 + " turn2: " + turn2);
        
        }
    }
    function shuffle(array) {
        let count = array.length;
        // While there are elements in the array
        while (count > 0) {
            // Random index
            let index = Math.floor(Math.random() * count);
            count--;
            // Swap the last element with chosen index
            let temp = array[count];
            array[count] = array[index];
            array[index] = temp;
        }
        return array;
    }
    const rowClass = "row justify-content-center";
    const columnClass = "col-1 my-1";
    var backgroundButtonClass = "btn btn-outline-light mx-3 mt-5"; 
    function showCards(){
        console.log("colors: " + colors)
        if(colors === "showAll"){
           setColors("hideAll");
        }
        else setColors("showAll");
        console.log("colors: " + colors)
        console.log("done");
    }
    return (
        <div className="">
          {/* <div className="align-center"> Status</div> */}
          <div className={rowClass}>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[0]} value={squares[0]} onSquareClick={() => handleClick(0)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[1]} value={squares[1]} onSquareClick={() => handleClick(1)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[2]} value={squares[2]} onSquareClick={() => handleClick(2)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[3]} value={squares[3]} onSquareClick={() => handleClick(3)} />    
            </div>
          </div>
          <div className={rowClass}>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[4]} value={squares[4]} onSquareClick={() => handleClick(4)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[5]} value={squares[5]} onSquareClick={() => handleClick(5)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[6]} value={squares[6]} onSquareClick={() => handleClick(6)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[7]} value={squares[7]} onSquareClick={() => handleClick(7)} />    
            </div>
          </div>
          <div className={rowClass}>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[8]} value={squares[8]} onSquareClick={() => handleClick(8)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[9]} value={squares[9]} onSquareClick={() => handleClick(9)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[10]} value={squares[10]} onSquareClick={() => handleClick(10)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[11]} value={squares[11]} onSquareClick={() => handleClick(11)} />    
            </div>
          </div>
          <div className={rowClass}>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[12]} value={squares[12]} onSquareClick={() => handleClick(12)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[13]} value={squares[13]} onSquareClick={() => handleClick(13)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[14]} value={squares[14]} onSquareClick={() => handleClick(14)} />    
            </div>
            <div className={columnClass}>
                <Square colors={colors} showColor={showColors[15]} value={squares[15]} onSquareClick={() => handleClick(15)} />    
            </div>
          </div>
          <button id="bg-2" className={backgroundButtonClass} type="button" onClick={() => showCards()}>Show Cards</button>
          <button id="bg-2" className={backgroundButtonClass} type="button" onClick={() => resetBoard()}>Reset Board</button>
        </div>
      );
}