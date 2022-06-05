import { useState } from "react";
import { Game } from "./Game";

function App() {
  const initialLifespan = 200;
  const initialDimension = 20;

  let [lifespan, setLifespan] = useState(initialLifespan);
  let [dimension, setDimension] = useState(initialDimension);

  const lifespanOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLifespan(parseInt(event.target.value));
  };

  const dimensionOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDimension(parseInt(event.target.value));
  };

  return (
    <div className="App">
      <div>
        <label>
          Lifespan{" "}
          <input
            type="range"
            name="lifespan"
            id="lifespan"
            min={1}
            max={300}
            value={initialLifespan}
            onChange={lifespanOnChange}
          />
        </label>
      </div>
      <div>
        <label>
          Dimension{" "}
          <input
            type="range"
            name="dimension"
            id="dimension"
            min={4}
            max={50}
            // value={initialDimension}
            onChange={dimensionOnChange}
          />
        </label>
      </div>
      <Game dimension={dimension} lifespan={lifespan}></Game>
    </div>
  );
}

export default App;
