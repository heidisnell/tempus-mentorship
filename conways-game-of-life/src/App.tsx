import React, { useReducer, useState } from "react";
import deepClone from "lodash";

// APP -----------------------------------------------
function App() {
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

function reducer(generation: boolean[][], action: GameAction) {
  const { type, rowNum, colNum } = action;
  switch (type) {
    case "toggle":
      // const nextGeneration: boolean[][] = deepClone(generation);
      let nextGeneration: boolean[][] = generation;
      nextGeneration[rowNum][colNum] = !generation[rowNum][colNum];
      console.log(`${generation}`);
      console.log({ nextGeneration });
      console.log(`${nextGeneration}`);
      return nextGeneration;
    // return { ...state, state: nextGeneration };
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
  const [generation, dispatch] = useReducer(
    reducer,
    Array(numRows).fill(Array(numCols).fill(false))
  );

  return (
    <div>
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
  // const [isAlive, setIsAlive] = useState(false)
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
