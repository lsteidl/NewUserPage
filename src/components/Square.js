

export default function Square({ disabled, showColor, colors, value, onSquareClick }) {
  // var space = '\u00A0';
  // space = space.repeat(1);
  var buttonClass = "";
  if(colors === "hideAll"){ // no colors, playing game
    if(showColor){
        if( value === -1) buttonClass =  "game-card invisible"; // match already found
        else if( value === 0)  buttonClass = "game-card red-card"; // card chosen
        else if (value === 1) buttonClass = "game-card orange-card"; // card chosen
        else if (value === 2) buttonClass = "game-card yellow-card"; // card chosen
        else if (value === 3) buttonClass = "game-card green-card"; // card chosen
        else if (value === 4) buttonClass = "game-card blue-card"; // card chosen
        else if (value === 5) buttonClass = "game-card purple-card"; // card chosen
        else buttonClass =  "disabled btn btn-outline-danger invisible btn-lg";
    }
    else {
        buttonClass = "game-card";
    }
  }
  else { // show all colors
    if(value === -1) buttonClass = "game-card invisible";
    else if( value === 0)  buttonClass = "game-card red-card"; // card chosen
    else if (value === 1) buttonClass = "game-card orange-card"; // card chosen
    else if (value === 2) buttonClass = "game-card yellow-card"; // card chosen
    else if (value === 3) buttonClass = "game-card green-card"; // card chosen
    else if (value === 4) buttonClass = "game-card blue-card"; // card chosen
    else if (value === 5) buttonClass = "game-card purple-card"; // card chosen
  }

  return (
    <button className={buttonClass} onClick={onSquareClick}>
      {/* {space}  */}
    </button>
  );
}