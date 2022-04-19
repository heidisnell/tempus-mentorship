import React, { useState } from "react";

function App() {
  return (
    <div className="App">
      <Game></Game>
    </div>
  );
}

const Game: React.FC = () => {
  return <Board numRows={10} numCols={10}></Board>;
};

const Board: React.FC<{ numRows: number; numCols: number }> = ({
  numRows,
  numCols,
}) => {
  const row = [];
  for (let i = 0; i < numCols; i++) {
    row.push(Cell);
  }
  return (
    <div>
      {row.map((C) => (
        <C></C>
      ))}
      <Cell></Cell>
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
      <p>{isAlive ? "O" : "X"}</p>
    </div>
  );
};

export default App;
