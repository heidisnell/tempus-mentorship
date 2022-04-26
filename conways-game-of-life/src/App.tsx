import React, { useState } from "react";
import deepClone from "lodash";

function App() {
  return (
    <div className="App">
      <Game></Game>
    </div>
  );
}

function getNumNeighbors(row: number, col: number) {
  //   // input current generation?
  //   let numNeighbors = 0;
  //   for (let r = Math.max(0, row - 1); r <= Math.min(numRows - 1, row + 1); r++) {
  //     for (
  //       let c = Math.max(0, col - 1);
  //       c <= Math.min(numCols - 1, col + 1);
  //       c++
  //     ) {
  //       if (r === row && c === col) {
  //         continue;
  //       } else if (generation[r][c] === true) {
  //         numNeighbors++;
  //       }
  //     }
  //   }
  //   return numNeighbors;
}
function setNeighborArray() {
  // input current generation
}
function createNextGeneration() {
  // input neighbor array and current generation
}

type GameAction = {
  type: "toggle";
  rowNum: number;
  colNum: number;
};
function reducer(state: boolean[][], action: GameAction) {
  const { type, rowNum, colNum } = action;
  switch (type) {
    case "toggle":
      const newState: boolean[][] = deepClone(state);
      const aliveness = !state[rowNum][colNum];
      newState[rowNum][colNum] = aliveness;
      return newState;
    default:
      throw new Error();
  }
}

const Game: React.FC = () => {
  const numRows = 10;
  const numCols = 10;
  const [generation, dispatch] = useReducer(
    reducer,
    Array(numRows).fill(Array(numCols).fill(false))
  );

  // const [generation, setGeneration] = useState<boolean[][]>(
  //   ,Array(numRows).fill(Array(numCols).fill(false))
  // );

  function toggleIsAlive(rowNum: number, colNum: number) {
    setGeneration((previousGeneration) => {
      previousGeneration[rowNum][colNum] = !previousGeneration[rowNum][colNum];
      console.log({ previousGeneration });
      return previousGeneration;
    });
    console.log(generation);
  }

  return (
    <div>
      {generation.map((row, rowNum) => (
        <div className="flex" key={`row${rowNum}`}>
          {row.map((isAlive, colNum) => (
            <Cell
              isAlive={isAlive}
              toggleIsAlive={() => toggleIsAlive(rowNum, colNum)}
              key={`row${rowNum}col${colNum}`}
            ></Cell>
          ))}
        </div>
      ))}
    </div>
  );
};

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
