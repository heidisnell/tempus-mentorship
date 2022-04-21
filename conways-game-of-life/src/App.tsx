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
  const [generation, setGeneration] = useState<boolean[][]>(
    Array(10).fill(Array(10).fill(false))
  );

  console.log(generation);

  return (
    <div>
      {generation.map((row, rowNum) => (
        <div className="flex" key={`row${rowNum}`}>
          {row.map((isAlive, colNum) => (
            <Cell
              isAlive={isAlive}
              toggleIsAlive={() => {
                console.log("clicked");
              }}
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
