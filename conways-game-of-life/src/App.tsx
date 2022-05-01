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
function getNumNeighbors(row: number, col: number, generation: boolean[][]) {
  const numRows = generation.length;
  const numCols = generation[0].length;
  let numNeighbors = 0;
  for (let r = Math.max(0, row - 1); r <= Math.min(numRows - 1, row + 1); r++) {
    for (
      let c = Math.max(0, col - 1);
      c <= Math.min(numCols - 1, col + 1);
      c++
    ) {
      if (r === row && c === col) {
        continue;
      } else if (generation[r][c] === true) {
        numNeighbors++;
      }
    }
  }
  return numNeighbors;
}

function setNeighborArray(generation: boolean[][]) {
  const numRows = generation.length;
  const numCols = generation[0].length;
  let numNeighborArray: number[][] = Array(numRows)
    .fill(0)
    .map((_) => {
      return new Array(numCols).fill(0);
    });
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      numNeighborArray[r][c] = getNumNeighbors(r, c, generation);
    }
  }
  return numNeighborArray;
}

function getNextGeneration(generation: boolean[][]) {
  const numRows = generation.length;
  const numCols = generation[0].length;
  const neighborArray: number[][] = setNeighborArray(generation);
  let nextGeneration: boolean[][] = Array(numRows)
    .fill(false)
    .map((_) => {
      return new Array(numCols).fill(false);
    });
  let numNeighbors: number;
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      numNeighbors = neighborArray[r][c];
      if (numNeighbors < 2 || numNeighbors > 3) {
        nextGeneration[r][c] = false;
      } else if (numNeighbors === 3) {
        nextGeneration[r][c] = true;
      } else {
        nextGeneration[r][c] = generation[r][c];
      }
    }
  }
  return nextGeneration;
}

function reducer(state: boolean[][], action: GameAction) {
  const { type, rowNum, colNum } = action;
  const numRows = state.length;
  const numCols = state[0].length;
  let nextGeneration: boolean[][] = Array(numRows)
    .fill(false)
    .map((_) => {
      return new Array(numCols).fill(false);
    });
  switch (type) {
    case "toggle":
      nextGeneration = _.cloneDeep(state);
      nextGeneration[rowNum][colNum] = !state[rowNum][colNum];
      console.log({ reducerGen: nextGeneration });
      return nextGeneration;
    case "refresh":
      nextGeneration = getNextGeneration(state);
      return nextGeneration;
    default:
      throw new Error();
  }
}

type GameAction = {
  // type: "toggle";
  type: string;
  rowNum: number;
  colNum: number;
};

// GAME ----------------------------------------------------------
const Game: React.FC = () => {
  const numRows = 20;
  const numCols = 20;
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

      dispatch({ type: "refresh", rowNum: 0, colNum: 0 });
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
