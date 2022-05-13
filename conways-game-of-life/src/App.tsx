import { useState } from "react";
import { Game } from "./Game";

function App() {
  let [lifespan, setLifespan] = useState(200);

  const lifespanOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLifespan(parseInt(event.target.value));
  };

  return (
    <div className="App">
      <Game dimension={30} lifespan={lifespan}></Game>
      <label>
        Lifespan{" "}
        <input
          type="range"
          name="lifespan"
          id="lifespan"
          min={1}
          max={300}
          onChange={lifespanOnChange}
        />
      </label>
    </div>
  );
}

export default App;
