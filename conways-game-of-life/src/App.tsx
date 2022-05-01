import React, { useEffect, useReducer, useState } from "react";
import * as _ from "lodash";

// APP -----------------------------------------------
function App() {
  console.log("app render");
  return (
    <div className="App">
      <Game></Game>
    </div>
  );
}

// ---------------------------------------------------
function getNumNeighbors(row: number, col: number) {
  // // input current generation?
  // let numNeighbors = 0;
  // for (let r = Math.max(0, row - 1); r <= Math.min(numRows - 1, row + 1); r++) {
  //   for (
  //     let c = Math.max(0, col - 1);
  //     c <= Math.min(numCols - 1, col + 1);
  //     c++
  //   ) {
  //     if (r === row && c === col) {
  //       continue;
  //     } else if (generation[r][c] === true) {
  //       numNeighbors++;
  //     }
  //   }
  // }
  // return numNeighbors;
}
function setNeighborArray() {
  // input current generation
}
function createNextGeneration() {
  // input neighbor array and current generation
}

function reducer(state: boolean[][], action: GameAction) {
  const { type, rowNum, colNum } = action;
  switch (type) {
    case "toggle":
      let nextGeneration: boolean[][] = _.cloneDeep(state);
      nextGeneration[rowNum][colNum] = !state[rowNum][colNum];
      console.log({ reducerGen: nextGeneration });
      return nextGeneration;
    default:
      throw new Error();
  }
}

type GameAction = {
  type: "toggle";
  rowNum: number;
  colNum: number;
};

// GAME ----------------------------------------------------------
const Game: React.FC = () => {
  const numRows = 10;
  const numCols = 10;
  let [generationNum, setGenerationNum] = useState(0);

  const [generation, dispatch] = useReducer(
    reducer,
    Array(numRows)
      .fill(0)
      .map((_) => {
        return new Array(numCols).fill(false);
      })
  );

  console.log("render");
  useEffect(() => {
    console.log("here");
    const interval = setInterval(() => {
      setGenerationNum(generationNum + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div>
      <div>{generationNum}</div>
      {generation.map((row, rowNum) => (
        <div className="flex" key={`row${rowNum}`}>
          {row.map((isAlive, colNum) => (
            <Cell
              isAlive={isAlive}
              toggleIsAlive={() =>
                dispatch({ type: "toggle", rowNum: rowNum, colNum: colNum })
              }
              key={`row${rowNum}col${colNum}`}
            ></Cell>
          ))}
        </div>
      ))}
    </div>
  );
};

// CELL ----------------------------------------------------------------------
const Cell: React.FC<{ isAlive: boolean; toggleIsAlive: () => void }> = ({
  isAlive,
  toggleIsAlive,
}) => {
  const handleClick = () => {
    toggleIsAlive();
  };
  return (
    <div onClick={handleClick}>
      <p className="bg-sky-900 text-center text-sky-300 h-8 w-8">
        {isAlive ? "▇" : "-"}
      </p>
    </div>
  );
};

export default App;
