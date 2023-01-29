
import Board from "./Board";

export default function Game() {
//xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}
    return(
        <div className="card mx-auto shadow bg-transparent text-white col-sm-11 col-md-8 col-lg-6 blur-card">
            <h3 className="card-header text-white">Score:</h3>
                        <div className="card-body">
                        <Board  />
                        </div>
        </div>
    )
}