import React, { useState } from "react";

function App() {
  return (
    <div className="App">
      <Game></Game>
    </div>
  );
}

const Game: React.FC = () => {
  // TODO: control speed
  return <Board numRows={10} numCols={10}></Board>;
};

const Board: React.FC<{ numRows: number; numCols: number }> = ({
  numRows,
  numCols,
}) => {
  let col: any[] = [];
  for (let i = 0; i < numCols; i++) {
    col.push(Cell);
  }
  const row = [];
  for (let j = 0; j < numRows; j++) {
    row.push(col);
  }
  return (
    <div>
      {row.map(() => (
        <div className="flex">
          {col.map((C) => (
            <C></C>
          ))}
        </div>
      ))}
    </div>
  );
};

const Cell: React.FC = () => {
  const [isAlive, setIsAlive] = useState(true);
  const handleClick = () => {
    setIsAlive(!isAlive);
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
