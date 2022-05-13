import { useState } from "react";
import { Game } from "./Game";

function App() {
  let [generationTime, setGenerationTime] = useState(300);

  const generationTimeOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGenerationTime(parseInt(event.target.value));
  };

  return (
    <div className="App">
      <Game dimension={30} generationTime={generationTime}></Game>
      <label htmlFor=""></label>
      <input
        type="range"
        name="generationTime"
        id="generationTime"
        min={0}
        max={1000}
        onChange={generationTimeOnChange}
      />
    </div>
  );
}

export default App;
