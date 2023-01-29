

export default function Square({ disabled, showColor, colors, value, onSquareClick }) {
  var space = '\u00A0';
  space = space.repeat(4);
  var buttonClass = "";
  if(colors === "hideAll"){ // no colors, playing game
    if(showColor){
        if( value === -1) buttonClass =  "btn btn-outline-danger invisible btn-lg"; // match already found
        else if( value === 0)  buttonClass = "btn btn-outline-light btn-lg bg-danger"; // card chosen
        else if (value === 1) buttonClass = "btn btn-outline-light btn-lg bg-warning"; // card chosen
        else if (value === 2) buttonClass = "btn btn-outline-light btn-lg bg-primary"; // card chosen
        else if (value === 3) buttonClass = "btn btn-outline-light btn-lg bg-secondary"; // card chosen
        else if (value === 4) buttonClass = "btn btn-outline-light btn-lg bg-success"; // card chosen
        else if (value === 5) buttonClass = "btn btn-outline-light btn-lg purple-card"; // card chosen
        else buttonClass =  "disabled btn btn-outline-danger invisible btn-lg";
    }
    else {
        buttonClass = "btn btn-outline-light btn-lg";
    }
  }
  else { // show all colors
    if(value === -1) buttonClass = "btn btn-outline-danger invisible btn-lg";
    else if( value === 0)  buttonClass = "btn btn-outline-light btn-lg bg-danger"; // card chosen
    else if (value === 1) buttonClass = "btn btn-outline-light btn-lg bg-warning"; // card chosen
    else if (value === 2) buttonClass = "btn btn-outline-light btn-lg bg-primary"; // card chosen
    else if (value === 3) buttonClass = "btn btn-outline-light btn-lg bg-secondary"; // card chosen
    else if (value === 4) buttonClass = "btn btn-outline-light btn-lg bg-success"; // card chosen
    else if (value === 5) buttonClass = "btn btn-outline-light btn-lg purple-card"; // card chosen
  }

  return (
    <button className={buttonClass} onClick={onSquareClick}>
      {space} 
    </button>
  );
}