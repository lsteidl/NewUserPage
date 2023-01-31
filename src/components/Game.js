
import Board from "./Board";
import { useState } from 'react';

export default function Game() {
    var [points, setPoints] = useState(0);
    return(
        <div className="card mx-auto shadow bg-transparent text-white col-sm-11 col-md-8 col-lg-6 blur-card">
            <h3 className="card-header text-white">Points: {points}</h3>
                        <div className="card-body mx-auto"> 
                            <Board  points={points} setPoints={(value) => setPoints(value)}/>
                        </div>
        </div>
    )
}