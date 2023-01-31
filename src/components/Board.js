import { useState, useEffect } from 'react';
import Square from './Square';
//{ xIsNext, squares, onPlay 
export default function Board({setPoints, points}) {
    // prepare initial card values
    var initialValues = Array.from({length: 8}, () => Math.floor(Math.random() * 6));
    initialValues.push(...initialValues);
    initialValues = shuffle(initialValues);
    const [showColors, setShowColors] = useState(Array(16).fill(0)); // which colors/cards are selected
    const [squares, setSquares] = useState(initialValues); // which color is each square
    var [colors, setColors] = useState("hideAll"); // track 
    const [turn1, setTurn1] = useState(null); // track choice for turn 1 
    const [turn2, setTurn2] = useState(null); // track choice for turn 2
    const [cardsLeft, setCardsLeft] = useState(16); // track number of cards left
    const [correctGuesses, setCorrectGuesses] = useState(0);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    function resetBoard(){
        setCardsLeft(16);
        setShowColors(Array(16).fill(0)); // tracks individual showing colors
        setSquares(initialValues); // tracks value (color) of each square
        setColors("hideAll");
        setTurn1(null);
        setTurn2(null);
        setCorrectGuesses(0);
        setIncorrectGuesses(0);
        setPoints(0);
    }
    useEffect(() => {
        if(turn1 !== null && turn2 !== null){
            console.log("both turns taken, not null");
            console.log("comparing: " + squares[turn1] + " and " + squares[turn2]);
            if(squares[turn1] === squares[turn2] && turn1 !== turn2){ // match found, remove squares
                console.log("MATCH FOUND");
                const nextSquares = squares.slice();
                nextSquares[turn1] = -1;
                nextSquares[turn2] = -1;
                setTimeout(function(){ // delay to show wrong choice for 2 seconds
                    setPoints(points + 50);
                    setCorrectGuesses(correctGuesses + 1);
                    setSquares(nextSquares);
                    setTurn1(null);
                    setTurn2(null);
                    setCardsLeft(cardsLeft - 2);
                }, 500)
            }
            else{ // incorrect, flip squares back over
                const nextColors = showColors.slice();
                nextColors[turn1] = 0;
                nextColors[turn2] = 0;
                setTimeout(function(){ // delay to show wrong choice for 2 seconds
                    setPoints(points - 20);
                    setIncorrectGuesses(incorrectGuesses + 1);
                    setShowColors(nextColors);  
                    setTurn1(null);
                    setTurn2(null);
                   // setShowColors(Array(16).fill(0));
                }, 500);
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
            else if (turn2 === null && value !== turn1){
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
    const columnClass = "col mt-4";
    var backgroundButtonClass = "btn btn-outline-light mx-3 mt-5"; 
    // Show the color of every card
    function showCards(){
        //setPoints(points - 200);
        console.log("colors: " + colors)
        if(colors === "showAll"){
           setColors("hideAll");
        }
        else setColors("showAll");
        console.log("colors: " + colors)
        console.log("done");
    }
    // create the Game Board
    function renderRow(row) {
            let items = 16;
            let columns = 4;
            let i = row * columns;
            return( 
                <div className={rowClass}> 
                    <div className={columnClass}> <Square colors={colors} showColor={showColors[i]} value={squares[i]} onSquareClick={() => handleClick(i)} /> </div>
                    <div className={columnClass}> <Square colors={colors} showColor={showColors[i+1]} value={squares[i+1]} onSquareClick={() => handleClick(i+1)} /> </div>
                    <div className={columnClass}> <Square colors={colors} showColor={showColors[i+2]} value={squares[i+2]} onSquareClick={() => handleClick(i+2)} /> </div>
                    <div className={columnClass}> <Square colors={colors} showColor={showColors[i+3]} value={squares[i+3]} onSquareClick={() => handleClick(i+3)} /> </div>
                </div> ) 
    }
    // Game is active
    if(cardsLeft > 0){
          return (
            <div>
               {renderRow(0)} 
               {renderRow(1)} 
               {renderRow(2)} 
               {renderRow(3)} 
                <div className='text-center'>
                        <button id="bg-2" className={backgroundButtonClass} type="button" onClick={() => showCards()}> {colors === "hideAll" ? "Show Cards": "Hide Cards"}</button>
                        <button id="bg-2" className={backgroundButtonClass} type="button" onClick={() => resetBoard()}>Reset Board</button>
                </div>
            </div>
            
      );  
    }
    // Game is Complete
    else {
        return(
            <div>
                <h1 className=" py-4 font-weight-bold text-center"> Complete! </h1>
                {/* <h2> Points: {points} </h2> */}
                <h4> Total Guesses: {incorrectGuesses + correctGuesses} </h4>
                <h4> Correct: {correctGuesses} </h4> 
                {/* <h4> Incorrect: {correctGuesses} </h4>  */}
                <button id="bg-2" className={backgroundButtonClass} type="button" onClick={() => resetBoard()}>New Game</button>
            </div>
        );
    }


}